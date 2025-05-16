/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/derp_contracts.json`.
 */
export type DerpContracts = {
  "address": "GZeLk7wqD1MUk2ELdMw4KskogNQsckoVqCTCbepxT1h3",
  "metadata": {
    "name": "derpContracts",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "applyFunding",
      "discriminator": [
        199,
        170,
        102,
        61,
        252,
        86,
        228,
        184
      ],
      "accounts": [
        {
          "name": "derpState",
          "writable": true
        },
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "signer": true
        },
        {
          "name": "pythPriceAccount"
        }
      ],
      "args": []
    },
    {
      "name": "calculateFunding",
      "discriminator": [
        109,
        126,
        133,
        200,
        231,
        48,
        227,
        128
      ],
      "accounts": [
        {
          "name": "derpState",
          "writable": true
        },
        {
          "name": "admin",
          "signer": true
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "closePosition",
      "discriminator": [
        123,
        134,
        81,
        0,
        49,
        68,
        98,
        98
      ],
      "accounts": [
        {
          "name": "derpState",
          "writable": true
        },
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "signer": true
        },
        {
          "name": "pythPriceAccount"
        }
      ],
      "args": [
        {
          "name": "assetType",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createUserAccount",
      "discriminator": [
        146,
        68,
        100,
        69,
        63,
        46,
        182,
        199
      ],
      "accounts": [
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "getMarketStatus",
      "discriminator": [
        51,
        68,
        212,
        8,
        4,
        23,
        221,
        91
      ],
      "accounts": [
        {
          "name": "derpState"
        },
        {
          "name": "pythPriceAccountGold"
        },
        {
          "name": "pythPriceAccountSol"
        },
        {
          "name": "pythPriceAccountFartcoin"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        }
      ],
      "args": [],
      "returns": {
        "defined": {
          "name": "marketSnapshots"
        }
      }
    },
    {
      "name": "getUserStatus",
      "discriminator": [
        219,
        123,
        153,
        80,
        255,
        159,
        164,
        155
      ],
      "accounts": [
        {
          "name": "derpState"
        },
        {
          "name": "userAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "signer": true
        },
        {
          "name": "pythPriceAccountGold"
        },
        {
          "name": "pythPriceAccountSol"
        },
        {
          "name": "pythPriceAccountFartcoin"
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        }
      ],
      "args": [],
      "returns": {
        "defined": {
          "name": "userSnapshot"
        }
      }
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "derpState",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "goldPythAccount",
          "type": "pubkey"
        },
        {
          "name": "solPythAccount",
          "type": "pubkey"
        },
        {
          "name": "fartcoinPythAccount",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "openPosition",
      "discriminator": [
        135,
        128,
        47,
        77,
        15,
        152,
        240,
        49
      ],
      "accounts": [
        {
          "name": "derpState",
          "writable": true
        },
        {
          "name": "userAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  97,
                  99,
                  99,
                  111,
                  117,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "signer": true
        },
        {
          "name": "pythPriceAccount"
        }
      ],
      "args": [
        {
          "name": "assetType",
          "type": "u8"
        },
        {
          "name": "size",
          "type": "i64"
        },
        {
          "name": "leverage",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "derpState",
      "discriminator": [
        116,
        203,
        242,
        29,
        75,
        238,
        45,
        113
      ]
    },
    {
      "name": "priceUpdateV2",
      "discriminator": [
        34,
        241,
        35,
        99,
        157,
        126,
        244,
        205
      ]
    },
    {
      "name": "userAccount",
      "discriminator": [
        211,
        33,
        136,
        16,
        186,
        110,
        242,
        127
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorizedAccess",
      "msg": "Unauthorized access"
    },
    {
      "code": 6001,
      "name": "invalidAssetType",
      "msg": "Invalid asset type"
    },
    {
      "code": 6002,
      "name": "invalidPositionSize",
      "msg": "Invalid position size"
    },
    {
      "code": 6003,
      "name": "invalidLeverage",
      "msg": "Invalid leverage"
    },
    {
      "code": 6004,
      "name": "insufficientBalance",
      "msg": "Insufficient balance"
    },
    {
      "code": 6005,
      "name": "positionAlreadyExists",
      "msg": "Position already exists"
    },
    {
      "code": 6006,
      "name": "noPositionExists",
      "msg": "No position exists to close"
    },
    {
      "code": 6007,
      "name": "invalidOracleAccount",
      "msg": "Invalid oracle account"
    },
    {
      "code": 6008,
      "name": "invalidOraclePrice",
      "msg": "Invalid oracle price"
    },
    {
      "code": 6009,
      "name": "mathOverflow",
      "msg": "Math overflow"
    }
  ],
  "types": [
    {
      "name": "derpState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "markets",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "marketInfo"
                  }
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "marketInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "assetType",
            "type": "u8"
          },
          {
            "name": "pythPriceAccount",
            "type": "pubkey"
          },
          {
            "name": "skew",
            "type": "i64"
          },
          {
            "name": "totalLongSize",
            "type": "u64"
          },
          {
            "name": "totalShortSize",
            "type": "u64"
          },
          {
            "name": "lastFundingTime",
            "type": "i64"
          },
          {
            "name": "globalFundingIndex",
            "type": "i128"
          }
        ]
      }
    },
    {
      "name": "marketSnapshot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentPriceOracle",
            "type": "u64"
          },
          {
            "name": "currentPriceAmm",
            "type": "u64"
          },
          {
            "name": "fundingIndex",
            "type": "i128"
          },
          {
            "name": "fundingRate",
            "type": "i64"
          },
          {
            "name": "lastFundingTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "marketSnapshots",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketSnapshots",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "marketSnapshot"
                  }
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "position",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "size",
            "type": "i64"
          },
          {
            "name": "entryPrice",
            "type": "u64"
          },
          {
            "name": "leverage",
            "type": "u8"
          },
          {
            "name": "lastFundingIndex",
            "type": "i128"
          }
        ]
      }
    },
    {
      "name": "positionStatus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "size",
            "type": "i64"
          },
          {
            "name": "entryPrice",
            "type": "u64"
          },
          {
            "name": "currentPriceOracle",
            "type": "u64"
          },
          {
            "name": "currentPriceAmm",
            "type": "u64"
          },
          {
            "name": "unrealizedPnl",
            "type": "i64"
          },
          {
            "name": "initialMargin",
            "type": "u64"
          },
          {
            "name": "maintenanceMargin",
            "type": "u64"
          },
          {
            "name": "claimableValue",
            "type": "i64"
          },
          {
            "name": "fundingIndex",
            "type": "i128"
          },
          {
            "name": "fundingRate",
            "type": "i64"
          },
          {
            "name": "lastFundingTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "priceFeedMessage",
      "repr": {
        "kind": "c"
      },
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feedId",
            "docs": [
              "`FeedId` but avoid the type alias because of compatibility issues with Anchor's `idl-build` feature."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "price",
            "type": "i64"
          },
          {
            "name": "conf",
            "type": "u64"
          },
          {
            "name": "exponent",
            "type": "i32"
          },
          {
            "name": "publishTime",
            "docs": [
              "The timestamp of this price update in seconds"
            ],
            "type": "i64"
          },
          {
            "name": "prevPublishTime",
            "docs": [
              "The timestamp of the previous price update. This field is intended to allow users to",
              "identify the single unique price update for any moment in time:",
              "for any time t, the unique update is the one such that prev_publish_time < t <= publish_time.",
              "",
              "Note that there may not be such an update while we are migrating to the new message-sending logic,",
              "as some price updates on pythnet may not be sent to other chains (because the message-sending",
              "logic may not have triggered). We can solve this problem by making the message-sending mandatory",
              "(which we can do once publishers have migrated over).",
              "",
              "Additionally, this field may be equal to publish_time if the message is sent on a slot where",
              "where the aggregation was unsuccesful. This problem will go away once all publishers have",
              "migrated over to a recent version of pyth-agent."
            ],
            "type": "i64"
          },
          {
            "name": "emaPrice",
            "type": "i64"
          },
          {
            "name": "emaConf",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "priceUpdateV2",
      "docs": [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "writeAuthority",
            "type": "pubkey"
          },
          {
            "name": "verificationLevel",
            "type": {
              "defined": {
                "name": "verificationLevel"
              }
            }
          },
          {
            "name": "priceMessage",
            "type": {
              "defined": {
                "name": "priceFeedMessage"
              }
            }
          },
          {
            "name": "postedSlot",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "positions",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "position"
                  }
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "userSnapshot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "balance",
            "type": "u64"
          },
          {
            "name": "positionStatus",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "positionStatus"
                  }
                },
                3
              ]
            }
          }
        ]
      }
    },
    {
      "name": "verificationLevel",
      "docs": [
        "Pyth price updates are bridged to all blockchains via Wormhole.",
        "Using the price updates on another chain requires verifying the signatures of the Wormhole guardians.",
        "The usual process is to check the signatures for two thirds of the total number of guardians, but this can be cumbersome on Solana because of the transaction size limits,",
        "so we also allow for partial verification.",
        "",
        "This enum represents how much a price update has been verified:",
        "- If `Full`, we have verified the signatures for two thirds of the current guardians.",
        "- If `Partial`, only `num_signatures` guardian signatures have been checked.",
        "",
        "# Warning",
        "Using partially verified price updates is dangerous, as it lowers the threshold of guardians that need to collude to produce a malicious price update."
      ],
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "partial",
            "fields": [
              {
                "name": "numSignatures",
                "type": "u8"
              }
            ]
          },
          {
            "name": "full"
          }
        ]
      }
    }
  ]
};
