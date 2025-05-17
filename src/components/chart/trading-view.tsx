"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { markets } from "@/lib/const";
import { prettyFormatUSDWithSubscript } from "@/lib/pretty";
import { useEffect, useRef } from "react";
import {
  ChartingLibraryWidgetOptions,
  type ResolutionString,
  type SeriesFormatterFactory,
} from "../../../public/scripts/tv/charting_library/charting_library";
import { useMarket } from "../market-provider";
import datafeed from "./datafeed";

const loadScriptLib = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.id = "tradingview-widget-script-lib";
    script.src = "/scripts/tv/charting_library/charting_library.standalone.js";
    script.type = "text/javascript";
    script.onload = resolve;
    document.head.appendChild(script);
  });

const loadScriptUdf = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.id = "tradingview-widget-script-udf";
    script.src = "/scripts/tv/udf.js";
    script.type = "text/javascript";
    script.onload = resolve;
    document.head.appendChild(script);
  });

const loadScripts = (): Promise<unknown> => Promise.all([loadScriptLib(), loadScriptUdf()]);

let tvScriptLoadingPromise: Promise<unknown>;

declare global {
  interface Window {
    tvWidget: any;
    Datafeeds: any;
  }
}

function getWidgetSettings(naked: boolean = false): Partial<ChartingLibraryWidgetOptions> {
  if (naked) {
    return {
      enabled_features: ["hide_left_toolbar_by_default", "hide_resolution_in_legend"],
      disabled_features: [
        "create_volume_indicator_by_default",
        "create_volume_indicator_by_default_once",
        "save_chart_properties_to_local_storage",
        "use_localstorage_for_settings",
        "header_symbol_search",
        "symbol_search_hot_key",
        "compare_symbol_search_spread_operators",
        "header_compare",
        "header_widget",
        "legend_widget",
        "edit_buttons_in_legend",
        "legend_context_menu",
        "use_localstorage_for_settings",
        "control_bar",
        "show_right_widgets_panel_by_default",
        "pricescale_currency",
        "pricescale_unit",
        "border_around_the_chart",
        "countdown",
        "display_market_status",
        "go_to_date",
        "header_saveload",
        "left_toolbar",
        "main_series_scale_menu",
        "object_tree_legend_mode",
        "property_pages",
        "popup_hints",
        "show_chart_property_page",
        "show_right_widgets_panel_by_default",
        "timeframes_toolbar",
        "timezone_menu",
      ],
    };
  } else {
    return {
      enabled_features: [],
      disabled_features: [
        "save_chart_properties_to_local_storage",
        "use_localstorage_for_settings",
        "header_symbol_search",
        "symbol_search_hot_key",
        "compare_symbol_search_spread_operators",
        "header_compare",
      ],
    };
  }
}

const priceFormatterFactory: SeriesFormatterFactory = () => {
  return {
    format(price: number) {
      if (price < 0) {
        return "";
      }
      return prettyFormatUSDWithSubscript(price, false);
    },
  };
};

export default function TradingViewChart() {
  const { marketId } = useMarket();
  const onLoadScriptRef = useRef<any>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = loadScripts();
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (document.getElementById("tradingview_5449a") && "TradingView" in window) {
        const widget = (window.tvWidget = new window.TradingView.widget({
          datafeed: datafeed,
          container: "tradingview_5449a",
          locale: "en",
          library_path: "/scripts/tv/charting_library/",
          interval: "15" as ResolutionString,
          autosize: true,
          symbol: markets[marketId].pythSymbol,
          timezone: (Intl.DateTimeFormat().resolvedOptions().timeZone as any) || "Etc/UTC",
          theme: "dark",
          custom_css_url: "/trading_view.css",
          overrides: {
            "paneProperties.background": "#171717",
            "paneProperties.backgroundType": "solid",
            "paneProperties.vertGridProperties.color": "#171717",
            "paneProperties.horzGridProperties.color": "#171717",
            "paneProperties.separatorColor": "#1f2023",
            "mainSeriesProperties.candleStyle.barColorsOnPrevClose": true,
            "mainSeriesProperties.candleStyle.upColor": "#01C38E",
            "mainSeriesProperties.candleStyle.borderUpColor": "#01C38E",
            "mainSeriesProperties.candleStyle.wickUpColor": "#01C38E",
            "mainSeriesProperties.candleStyle.downColor": "#D60F57",
            "mainSeriesProperties.candleStyle.borderDownColor": "#D60F57",
            "mainSeriesProperties.candleStyle.wickDownColor": "#D60F57",
            "scalesProperties.lineColor": "#1f2023",
            "scalesProperties.textColor": "#8C8C8C",
            "scalesProperties.fontSize": 14,
            "paneProperties.horzGridProperties.style": 1,
          },
          custom_formatters: {
            priceFormatterFactory,
          } as any,
          ...getWidgetSettings(false),
        }));

        widget.onChartReady(() => {
          const priceScale = widget.activeChart().getPanes()[0].getMainSourcePriceScale();
          priceScale?.setAutoScale(true);
        });
      }
    }
  }, [marketId]);

  return (
    <div
      id="tradingview_5449a"
      className={`overflow-hidden`}
      style={{ height: "100%", width: "100%" }}
    />
  );
}
