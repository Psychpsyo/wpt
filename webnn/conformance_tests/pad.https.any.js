// META: title=test WebNN API pad operation
// META: global=window,dedicatedworker
// META: variant=?cpu
// META: variant=?gpu
// META: variant=?npu
// META: script=../resources/utils.js
// META: timeout=long

'use strict';

// https://www.w3.org/TR/webnn/#api-mlgraphbuilder-pad
// Inflate the tensor with constant or mirrored values on the edges.
//
// enum MLPaddingMode {
//   "constant",
//   "edge",
//   "reflection",
//   "symmetric"
// };
//
// dictionary MLPadOptions {
//   MLPaddingMode mode = "constant";
//   MLNumber value = 0;
// };
//
// MLOperand pad(
//     MLOperand input, sequence<[EnforceRange] unsigned long>beginningPadding,
//     sequence<[EnforceRange] unsigned long>endingPadding,
//     optional MLPadOptions options = {});


const getPadPrecisionTolerance = (graphResources) => {
  const toleranceValueDict = {float32: 0, float16: 0};
  const expectedDataType =
      getExpectedDataTypeOfSingleOutput(graphResources.expectedOutputs);
  return {metricType: 'ULP', value: toleranceValueDict[expectedDataType]};
};

const padTests = [
  {
    'name': 'pad float32 1D constant tensor default options',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [9], 'dataType': 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [1]},
          {'endingPadding': [1]}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            0, 22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547, 0
          ],
          'descriptor': {'dimensions': [11], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'pad float32 1D tensor default options',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [9], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [1]},
          {'endingPadding': [1]}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            0, 22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547, 0
          ],
          'descriptor': {'dimensions': [11], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'pad float32 2D tensor default options',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [3, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [1, 1]},
          {'endingPadding': [1, 1]}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            0,
            0,
            0,
            0,
            0,
            0,
            22.76361846923828,
            -21.168529510498047,
            -91.66168975830078,
            0,
            0,
            16.863798141479492,
            60.51472091674805,
            -70.56755065917969,
            0,
            0,
            -60.643272399902344,
            -47.8821907043457,
            68.72557830810547,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          'descriptor': {'dimensions': [5, 5], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'pad float32 3D tensor default options',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [1, 3, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [1, 1, 1]},
          {'endingPadding': [1, 1, 1]}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            22.76361846923828,
            -21.168529510498047,
            -91.66168975830078,
            0,
            0,
            16.863798141479492,
            60.51472091674805,
            -70.56755065917969,
            0,
            0,
            -60.643272399902344,
            -47.8821907043457,
            68.72557830810547,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          'descriptor': {'dimensions': [3, 5, 5], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'pad float32 4D tensor default options',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [1, 3, 3, 1], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [0, 1, 1, 1]},
          {'endingPadding': [0, 1, 1, 1]}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            22.76361846923828,
            0,
            0,
            -21.168529510498047,
            0,
            0,
            -91.66168975830078,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            16.863798141479492,
            0,
            0,
            60.51472091674805,
            0,
            0,
            -70.56755065917969,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            -60.643272399902344,
            0,
            0,
            -47.8821907043457,
            0,
            0,
            68.72557830810547,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          'descriptor': {'dimensions': [1, 5, 5, 3], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'pad float32 5D tensor default options',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [1, 3, 3, 1, 1], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [0, 1, 1, 0, 1]},
          {'endingPadding': [0, 1, 1, 0, 1]}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            22.76361846923828,
            0,
            0,
            -21.168529510498047,
            0,
            0,
            -91.66168975830078,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            16.863798141479492,
            0,
            0,
            60.51472091674805,
            0,
            0,
            -70.56755065917969,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            -60.643272399902344,
            0,
            0,
            -47.8821907043457,
            0,
            0,
            68.72557830810547,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          'descriptor': {'dimensions': [1, 5, 5, 1, 3], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'pad float32 2D tensor explicit options.mode=\'constant\'',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [3, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [1, 1]},
          {'endingPadding': [1, 1]}, {'options': {'mode': 'constant'}}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            0,
            0,
            0,
            0,
            0,
            0,
            22.76361846923828,
            -21.168529510498047,
            -91.66168975830078,
            0,
            0,
            16.863798141479492,
            60.51472091674805,
            -70.56755065917969,
            0,
            0,
            -60.643272399902344,
            -47.8821907043457,
            68.72557830810547,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          'descriptor': {'dimensions': [5, 5], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'pad float32 2D tensor options.value default constant mode',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [3, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [1, 1]},
          {'endingPadding': [1, 1]}, {'options': {'value': 1}}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            1,
            1,
            1,
            1,
            1,
            1,
            22.76361846923828,
            -21.168529510498047,
            -91.66168975830078,
            1,
            1,
            16.863798141479492,
            60.51472091674805,
            -70.56755065917969,
            1,
            1,
            -60.643272399902344,
            -47.8821907043457,
            68.72557830810547,
            1,
            1,
            1,
            1,
            1,
            1
          ],
          'descriptor': {'dimensions': [5, 5], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'pad float32 4D tensor options.mode=\'edge\'',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [1, 3, 3, 1], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [0, 2, 2, 0]},
          {'endingPadding': [0, 2, 2, 0]}, {'options': {'mode': 'edge'}}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            22.76361846923828,   22.76361846923828,   22.76361846923828,
            -21.168529510498047, -91.66168975830078,  -91.66168975830078,
            -91.66168975830078,  22.76361846923828,   22.76361846923828,
            22.76361846923828,   -21.168529510498047, -91.66168975830078,
            -91.66168975830078,  -91.66168975830078,  22.76361846923828,
            22.76361846923828,   22.76361846923828,   -21.168529510498047,
            -91.66168975830078,  -91.66168975830078,  -91.66168975830078,
            16.863798141479492,  16.863798141479492,  16.863798141479492,
            60.51472091674805,   -70.56755065917969,  -70.56755065917969,
            -70.56755065917969,  -60.643272399902344, -60.643272399902344,
            -60.643272399902344, -47.8821907043457,   68.72557830810547,
            68.72557830810547,   68.72557830810547,   -60.643272399902344,
            -60.643272399902344, -60.643272399902344, -47.8821907043457,
            68.72557830810547,   68.72557830810547,   68.72557830810547,
            -60.643272399902344, -60.643272399902344, -60.643272399902344,
            -47.8821907043457,   68.72557830810547,   68.72557830810547,
            68.72557830810547
          ],
          'descriptor': {'dimensions': [1, 7, 7, 1], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'pad float32 4D tensor options.mode=\'reflection\'',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [1, 3, 3, 1], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [0, 2, 2, 0]},
          {'endingPadding': [0, 2, 2, 0]}, {'options': {'mode': 'reflection'}}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            68.72557830810547,   -47.8821907043457,   -60.643272399902344,
            -47.8821907043457,   68.72557830810547,   -47.8821907043457,
            -60.643272399902344, -70.56755065917969,  60.51472091674805,
            16.863798141479492,  60.51472091674805,   -70.56755065917969,
            60.51472091674805,   16.863798141479492,  -91.66168975830078,
            -21.168529510498047, 22.76361846923828,   -21.168529510498047,
            -91.66168975830078,  -21.168529510498047, 22.76361846923828,
            -70.56755065917969,  60.51472091674805,   16.863798141479492,
            60.51472091674805,   -70.56755065917969,  60.51472091674805,
            16.863798141479492,  68.72557830810547,   -47.8821907043457,
            -60.643272399902344, -47.8821907043457,   68.72557830810547,
            -47.8821907043457,   -60.643272399902344, -70.56755065917969,
            60.51472091674805,   16.863798141479492,  60.51472091674805,
            -70.56755065917969,  60.51472091674805,   16.863798141479492,
            -91.66168975830078,  -21.168529510498047, 22.76361846923828,
            -21.168529510498047, -91.66168975830078,  -21.168529510498047,
            22.76361846923828
          ],
          'descriptor': {'dimensions': [1, 7, 7, 1], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'pad float32 4D tensor options.mode=\'symmetric\'',
    'graph': {
      'inputs': {
        'padInput': {
          'data': [
            22.76361846923828, -21.168529510498047, -91.66168975830078,
            16.863798141479492, 60.51472091674805, -70.56755065917969,
            -60.643272399902344, -47.8821907043457, 68.72557830810547
          ],
          'descriptor': {'dimensions': [1, 3, 3, 1], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'pad',
        'arguments': [
          {'input': 'padInput'}, {'beginningPadding': [0, 2, 2, 0]},
          {'endingPadding': [0, 2, 2, 0]}, {'options': {'mode': 'symmetric'}}
        ],
        'outputs': 'padOutput'
      }],
      'expectedOutputs': {
        'padOutput': {
          'data': [
            60.51472091674805,   16.863798141479492,  16.863798141479492,
            60.51472091674805,   -70.56755065917969,  -70.56755065917969,
            60.51472091674805,   -21.168529510498047, 22.76361846923828,
            22.76361846923828,   -21.168529510498047, -91.66168975830078,
            -91.66168975830078,  -21.168529510498047, -21.168529510498047,
            22.76361846923828,   22.76361846923828,   -21.168529510498047,
            -91.66168975830078,  -91.66168975830078,  -21.168529510498047,
            60.51472091674805,   16.863798141479492,  16.863798141479492,
            60.51472091674805,   -70.56755065917969,  -70.56755065917969,
            60.51472091674805,   -47.8821907043457,   -60.643272399902344,
            -60.643272399902344, -47.8821907043457,   68.72557830810547,
            68.72557830810547,   -47.8821907043457,   -47.8821907043457,
            -60.643272399902344, -60.643272399902344, -47.8821907043457,
            68.72557830810547,   68.72557830810547,   -47.8821907043457,
            60.51472091674805,   16.863798141479492,  16.863798141479492,
            60.51472091674805,   -70.56755065917969,  -70.56755065917969,
            60.51472091674805
          ],
          'descriptor': {'dimensions': [1, 7, 7, 1], 'dataType': 'float32'}
        }
      }
    }
  }
];

if (navigator.ml) {
  padTests.forEach((test) => {
    webnn_conformance_test(
        buildGraphAndCompute, getPadPrecisionTolerance, test);
  });
} else {
  test(() => assert_implements(navigator.ml, 'missing navigator.ml'));
}
