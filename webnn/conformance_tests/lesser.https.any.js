// META: title=test WebNN API element-wise lesser operation
// META: global=window,dedicatedworker
// META: variant=?cpu
// META: variant=?gpu
// META: variant=?npu
// META: script=../resources/utils.js
// META: timeout=long

'use strict';

// https://www.w3.org/TR/webnn/#api-mlgraphbuilder-logical
// Compare if the values of the first input tensor is lesser, element-wise.
//
// MLOperand lesser(MLOperand a, MLOperand b);


const getLesserPrecisionTolerance = (graphResources) => {
  const toleranceValueDict = {uint8: 0};
  const expectedDataType =
      getExpectedDataTypeOfSingleOutput(graphResources.expectedOutputs);
  return {metricType: 'ULP', value: toleranceValueDict[expectedDataType]};
};

const lesserTests = [
  {
    'name': 'lesser float32 0D scalar',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [-0.5228080153465271],
          'descriptor': {'dimensions': [], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [0.8150388598442078],
          'descriptor': {'dimensions': [], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output':
            {'data': [1], 'descriptor': {'dimensions': [], 'dataType': 'uint8'}}
      }
    }
  },
  {
    'name': 'lesser float32 1D constant tensors',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'},
          'constant': true
        },
        'inputB': {
          'data': [
            2.945375680923462,   3.730471611022949,    4.0253753662109375,
            -4.718355178833008,  6.7732744216918945,   -2.042813539505005,
            -6.526762008666992,  6.826299667358398,    -9.267172813415527,
            6.118423938751221,   -2.001732349395752,   1.779831051826477,
            9.660094261169434,   -2.7473158836364746,  -3.4345006942749023,
            -4.751097679138184,  -6.092621803283691,   -0.4334806203842163,
            -1.4069052934646606, -0.23742099106311798, -9.10597038269043,
            6.811779975891113,   -6.768326759338379,   -8.952353477478027
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
            1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'uint8'}
        }
      }
    }
  },
  {
    'name': 'lesser float32 1D tensors',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [
            2.945375680923462,   3.730471611022949,    4.0253753662109375,
            -4.718355178833008,  6.7732744216918945,   -2.042813539505005,
            -6.526762008666992,  6.826299667358398,    -9.267172813415527,
            6.118423938751221,   -2.001732349395752,   1.779831051826477,
            9.660094261169434,   -2.7473158836364746,  -3.4345006942749023,
            -4.751097679138184,  -6.092621803283691,   -0.4334806203842163,
            -1.4069052934646606, -0.23742099106311798, -9.10597038269043,
            6.811779975891113,   -6.768326759338379,   -8.952353477478027
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
            1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'uint8'}
        }
      }
    }
  },
  {
    'name': 'lesser float32 2D tensors',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [
            2.945375680923462,   3.730471611022949,    4.0253753662109375,
            -4.718355178833008,  6.7732744216918945,   -2.042813539505005,
            -6.526762008666992,  6.826299667358398,    -9.267172813415527,
            6.118423938751221,   -2.001732349395752,   1.779831051826477,
            9.660094261169434,   -2.7473158836364746,  -3.4345006942749023,
            -4.751097679138184,  -6.092621803283691,   -0.4334806203842163,
            -1.4069052934646606, -0.23742099106311798, -9.10597038269043,
            6.811779975891113,   -6.768326759338379,   -8.952353477478027
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
            1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'uint8'}
        }
      }
    }
  },
  {
    'name': 'lesser float32 3D tensors',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [
            2.945375680923462,   3.730471611022949,    4.0253753662109375,
            -4.718355178833008,  6.7732744216918945,   -2.042813539505005,
            -6.526762008666992,  6.826299667358398,    -9.267172813415527,
            6.118423938751221,   -2.001732349395752,   1.779831051826477,
            9.660094261169434,   -2.7473158836364746,  -3.4345006942749023,
            -4.751097679138184,  -6.092621803283691,   -0.4334806203842163,
            -1.4069052934646606, -0.23742099106311798, -9.10597038269043,
            6.811779975891113,   -6.768326759338379,   -8.952353477478027
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
            1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'uint8'}
        }
      }
    }
  },
  {
    'name': 'lesser float32 4D tensors',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [
            2.945375680923462,   3.730471611022949,    4.0253753662109375,
            -4.718355178833008,  6.7732744216918945,   -2.042813539505005,
            -6.526762008666992,  6.826299667358398,    -9.267172813415527,
            6.118423938751221,   -2.001732349395752,   1.779831051826477,
            9.660094261169434,   -2.7473158836364746,  -3.4345006942749023,
            -4.751097679138184,  -6.092621803283691,   -0.4334806203842163,
            -1.4069052934646606, -0.23742099106311798, -9.10597038269043,
            6.811779975891113,   -6.768326759338379,   -8.952353477478027
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
            1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'uint8'}
        }
      }
    }
  },
  {
    'name': 'lesser float32 5D tensors',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [2, 2, 1, 2, 3], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [
            2.945375680923462,   3.730471611022949,    4.0253753662109375,
            -4.718355178833008,  6.7732744216918945,   -2.042813539505005,
            -6.526762008666992,  6.826299667358398,    -9.267172813415527,
            6.118423938751221,   -2.001732349395752,   1.779831051826477,
            9.660094261169434,   -2.7473158836364746,  -3.4345006942749023,
            -4.751097679138184,  -6.092621803283691,   -0.4334806203842163,
            -1.4069052934646606, -0.23742099106311798, -9.10597038269043,
            6.811779975891113,   -6.768326759338379,   -8.952353477478027
          ],
          'descriptor': {'dimensions': [2, 2, 1, 2, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1,
            1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0
          ],
          'descriptor': {'dimensions': [2, 2, 1, 2, 3], 'dataType': 'uint8'}
        }
      }
    }
  },
  {
    'name': 'lesser float32 broadcast 0D to 4D',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [-5.678369998931885],
          'descriptor': {'dimensions': [], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
            1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'uint8'}
        }
      }
    }
  },
  {
    'name': 'lesser float32 broadcast 1D to 4D',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [-5.678369998931885],
          'descriptor': {'dimensions': [1], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
            1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'uint8'}
        }
      }
    }
  },
  {
    'name': 'lesser float32 broadcast 2D to 4D',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [
            3.5869946479797363, -2.853332042694092, -3.684652805328369,
            2.4055018424987793, -4.358371257781982, 5.5484747886657715
          ],
          'descriptor': {'dimensions': [2, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,
            1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'uint8'}
        }
      }
    }
  },
  {
    'name': 'lesser float32 broadcast 3D to 4D',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [
            -4.439523696899414, 2.7518322467803955, 3.635943651199341,
            -2.8089921474456787
          ],
          'descriptor': {'dimensions': [2, 2, 1], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1,
            0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'uint8'}
        }
      }
    }
  },
  {
    'name': 'lesser float32 broadcast 4D to 4D',
    'graph': {
      'inputs': {
        'inputA': {
          'data': [-5.678369998931885],
          'descriptor': {'dimensions': [1, 1, 1, 1], 'dataType': 'float32'}
        },
        'inputB': {
          'data': [
            -1.147218942642212,  -8.409374237060547,  -2.2753310203552246,
            -0.5770801305770874, 8.171789169311523,   -0.907120943069458,
            5.2908453941345215,  -3.9134645462036133, 9.825095176696777,
            -8.931730270385742,  -3.457401752471924,  -7.331232070922852,
            1.232004165649414,   4.312077045440674,   1.2715545892715454,
            4.184540748596191,   -6.710920333862305,  3.0768423080444336,
            1.0030865669250488,  -9.076244354248047,  8.907161712646484,
            4.232614994049072,   2.1005890369415283,  -6.201345443725586
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'lesser',
        'arguments': [{'a': 'inputA'}, {'b': 'inputB'}],
        'outputs': 'output'
      }],
      'expectedOutputs': {
        'output': {
          'data': [
            1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
            1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'uint8'}
        }
      }
    }
  }
];

if (navigator.ml) {
  lesserTests.forEach((test) => {
    webnn_conformance_test(
        buildGraphAndCompute, getLesserPrecisionTolerance, test);
  });
} else {
  test(() => assert_implements(navigator.ml, 'missing navigator.ml'));
}
