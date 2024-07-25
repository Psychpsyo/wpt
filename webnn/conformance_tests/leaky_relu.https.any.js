// META: title=test WebNN API leakyRelu operation
// META: global=window,dedicatedworker
// META: variant=?cpu
// META: variant=?gpu
// META: variant=?npu
// META: script=../resources/utils.js
// META: timeout=long

'use strict';

// https://www.w3.org/TR/webnn/#api-mlgraphbuilder-leakyrelu
// Calculate the leaky version of rectified linear function on the input tensor
// element-wise. The calculation follows the expression
// max(0, x) + alpha * min(0, x).
//
// dictionary MLLeakyReluOptions {
//   double alpha = 0.01;
// };
//
// MLOperand leakyRelu(
//     MLOperand input, optional MLLeakyReluOptions options = {});


const getLeakyReluPrecisionTolerance = (graphResources) => {
  const toleranceValueDict = {float32: 1, float16: 1};
  const expectedDataType =
      getExpectedDataTypeOfSingleOutput(graphResources.expectedOutputs);
  return {metricType: 'ULP', value: toleranceValueDict[expectedDataType]};
};

const leakyReluTests = [
  {
    'name': 'leakyRelu float32 1D constant tensor default options',
    'graph': {
      'inputs': {
        'leakyReluInput': {
          'data': [
            -19.053640365600586, 50.77590560913086,  -69.54966735839844,
            -80.57432556152344,  -90.4011001586914,  76.02884674072266,
            66.33873748779297,   -84.10186767578125, -17.19101333618164,
            -87.47624206542969,  -3.416466474533081, -22.77235984802246,
            -2.509489059448242,  18.933284759521484, 98.61402893066406,
            55.3392333984375,    -33.17860412597656, -46.03901290893555,
            -61.47925567626953,  64.26514434814453,  21.469341278076172,
            -31.514690399169922, -41.27694320678711, -65.59529113769531
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'leakyRelu',
        'arguments': [{'input': 'leakyReluInput'}],
        'outputs': 'leakyReluOutput'
      }],
      'expectedOutputs': {
        'leakyReluOutput': {
          'data': [
            -0.19053640961647034, 50.77590560913086,    -0.695496678352356,
            -0.8057432770729065,  -0.9040110111236572,  76.02884674072266,
            66.33873748779297,    -0.8410186767578125,  -0.1719101369380951,
            -0.8747624158859253,  -0.0341646634042263,  -0.2277235984802246,
            -0.02509489096701145, 18.933284759521484,   98.61402893066406,
            55.3392333984375,     -0.33178603649139404, -0.4603901207447052,
            -0.6147925853729248,  64.26514434814453,    21.469341278076172,
            -0.31514689326286316, -0.4127694368362427,  -0.6559529304504395
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'leakyRelu float32 1D tensor default options',
    'graph': {
      'inputs': {
        'leakyReluInput': {
          'data': [
            -19.053640365600586, 50.77590560913086,  -69.54966735839844,
            -80.57432556152344,  -90.4011001586914,  76.02884674072266,
            66.33873748779297,   -84.10186767578125, -17.19101333618164,
            -87.47624206542969,  -3.416466474533081, -22.77235984802246,
            -2.509489059448242,  18.933284759521484, 98.61402893066406,
            55.3392333984375,    -33.17860412597656, -46.03901290893555,
            -61.47925567626953,  64.26514434814453,  21.469341278076172,
            -31.514690399169922, -41.27694320678711, -65.59529113769531
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'leakyRelu',
        'arguments': [{'input': 'leakyReluInput'}],
        'outputs': 'leakyReluOutput'
      }],
      'expectedOutputs': {
        'leakyReluOutput': {
          'data': [
            -0.19053640961647034, 50.77590560913086,    -0.695496678352356,
            -0.8057432770729065,  -0.9040110111236572,  76.02884674072266,
            66.33873748779297,    -0.8410186767578125,  -0.1719101369380951,
            -0.8747624158859253,  -0.0341646634042263,  -0.2277235984802246,
            -0.02509489096701145, 18.933284759521484,   98.61402893066406,
            55.3392333984375,     -0.33178603649139404, -0.4603901207447052,
            -0.6147925853729248,  64.26514434814453,    21.469341278076172,
            -0.31514689326286316, -0.4127694368362427,  -0.6559529304504395
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'leakyRelu float32 2D tensor default options',
    'graph': {
      'inputs': {
        'leakyReluInput': {
          'data': [
            -19.053640365600586, 50.77590560913086,  -69.54966735839844,
            -80.57432556152344,  -90.4011001586914,  76.02884674072266,
            66.33873748779297,   -84.10186767578125, -17.19101333618164,
            -87.47624206542969,  -3.416466474533081, -22.77235984802246,
            -2.509489059448242,  18.933284759521484, 98.61402893066406,
            55.3392333984375,    -33.17860412597656, -46.03901290893555,
            -61.47925567626953,  64.26514434814453,  21.469341278076172,
            -31.514690399169922, -41.27694320678711, -65.59529113769531
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'leakyRelu',
        'arguments': [{'input': 'leakyReluInput'}],
        'outputs': 'leakyReluOutput'
      }],
      'expectedOutputs': {
        'leakyReluOutput': {
          'data': [
            -0.19053640961647034, 50.77590560913086,    -0.695496678352356,
            -0.8057432770729065,  -0.9040110111236572,  76.02884674072266,
            66.33873748779297,    -0.8410186767578125,  -0.1719101369380951,
            -0.8747624158859253,  -0.0341646634042263,  -0.2277235984802246,
            -0.02509489096701145, 18.933284759521484,   98.61402893066406,
            55.3392333984375,     -0.33178603649139404, -0.4603901207447052,
            -0.6147925853729248,  64.26514434814453,    21.469341278076172,
            -0.31514689326286316, -0.4127694368362427,  -0.6559529304504395
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'leakyRelu float32 3D tensor default options',
    'graph': {
      'inputs': {
        'leakyReluInput': {
          'data': [
            -19.053640365600586, 50.77590560913086,  -69.54966735839844,
            -80.57432556152344,  -90.4011001586914,  76.02884674072266,
            66.33873748779297,   -84.10186767578125, -17.19101333618164,
            -87.47624206542969,  -3.416466474533081, -22.77235984802246,
            -2.509489059448242,  18.933284759521484, 98.61402893066406,
            55.3392333984375,    -33.17860412597656, -46.03901290893555,
            -61.47925567626953,  64.26514434814453,  21.469341278076172,
            -31.514690399169922, -41.27694320678711, -65.59529113769531
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'leakyRelu',
        'arguments': [{'input': 'leakyReluInput'}],
        'outputs': 'leakyReluOutput'
      }],
      'expectedOutputs': {
        'leakyReluOutput': {
          'data': [
            -0.19053640961647034, 50.77590560913086,    -0.695496678352356,
            -0.8057432770729065,  -0.9040110111236572,  76.02884674072266,
            66.33873748779297,    -0.8410186767578125,  -0.1719101369380951,
            -0.8747624158859253,  -0.0341646634042263,  -0.2277235984802246,
            -0.02509489096701145, 18.933284759521484,   98.61402893066406,
            55.3392333984375,     -0.33178603649139404, -0.4603901207447052,
            -0.6147925853729248,  64.26514434814453,    21.469341278076172,
            -0.31514689326286316, -0.4127694368362427,  -0.6559529304504395
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'leakyRelu float32 4D tensor default options',
    'graph': {
      'inputs': {
        'leakyReluInput': {
          'data': [
            -19.053640365600586, 50.77590560913086,  -69.54966735839844,
            -80.57432556152344,  -90.4011001586914,  76.02884674072266,
            66.33873748779297,   -84.10186767578125, -17.19101333618164,
            -87.47624206542969,  -3.416466474533081, -22.77235984802246,
            -2.509489059448242,  18.933284759521484, 98.61402893066406,
            55.3392333984375,    -33.17860412597656, -46.03901290893555,
            -61.47925567626953,  64.26514434814453,  21.469341278076172,
            -31.514690399169922, -41.27694320678711, -65.59529113769531
          ],
          'descriptor': {'dimensions': [1, 2, 3, 4], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'leakyRelu',
        'arguments': [{'input': 'leakyReluInput'}],
        'outputs': 'leakyReluOutput'
      }],
      'expectedOutputs': {
        'leakyReluOutput': {
          'data': [
            -0.19053640961647034, 50.77590560913086,    -0.695496678352356,
            -0.8057432770729065,  -0.9040110111236572,  76.02884674072266,
            66.33873748779297,    -0.8410186767578125,  -0.1719101369380951,
            -0.8747624158859253,  -0.0341646634042263,  -0.2277235984802246,
            -0.02509489096701145, 18.933284759521484,   98.61402893066406,
            55.3392333984375,     -0.33178603649139404, -0.4603901207447052,
            -0.6147925853729248,  64.26514434814453,    21.469341278076172,
            -0.31514689326286316, -0.4127694368362427,  -0.6559529304504395
          ],
          'descriptor': {'dimensions': [1, 2, 3, 4], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'leakyRelu float32 5D tensor default options',
    'graph': {
      'inputs': {
        'leakyReluInput': {
          'data': [
            -19.053640365600586, 50.77590560913086,  -69.54966735839844,
            -80.57432556152344,  -90.4011001586914,  76.02884674072266,
            66.33873748779297,   -84.10186767578125, -17.19101333618164,
            -87.47624206542969,  -3.416466474533081, -22.77235984802246,
            -2.509489059448242,  18.933284759521484, 98.61402893066406,
            55.3392333984375,    -33.17860412597656, -46.03901290893555,
            -61.47925567626953,  64.26514434814453,  21.469341278076172,
            -31.514690399169922, -41.27694320678711, -65.59529113769531
          ],
          'descriptor': {'dimensions': [1, 2, 1, 3, 4], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'leakyRelu',
        'arguments': [{'input': 'leakyReluInput'}],
        'outputs': 'leakyReluOutput'
      }],
      'expectedOutputs': {
        'leakyReluOutput': {
          'data': [
            -0.19053640961647034, 50.77590560913086,    -0.695496678352356,
            -0.8057432770729065,  -0.9040110111236572,  76.02884674072266,
            66.33873748779297,    -0.8410186767578125,  -0.1719101369380951,
            -0.8747624158859253,  -0.0341646634042263,  -0.2277235984802246,
            -0.02509489096701145, 18.933284759521484,   98.61402893066406,
            55.3392333984375,     -0.33178603649139404, -0.4603901207447052,
            -0.6147925853729248,  64.26514434814453,    21.469341278076172,
            -0.31514689326286316, -0.4127694368362427,  -0.6559529304504395
          ],
          'descriptor': {'dimensions': [1, 2, 1, 3, 4], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'leakyRelu float32 1D tensor negative options.alpha',
    'graph': {
      'inputs': {
        'leakyReluInput': {
          'data': [
            -19.053640365600586, 50.77590560913086,  -69.54966735839844,
            -80.57432556152344,  -90.4011001586914,  76.02884674072266,
            66.33873748779297,   -84.10186767578125, -17.19101333618164,
            -87.47624206542969,  -3.416466474533081, -22.77235984802246,
            -2.509489059448242,  18.933284759521484, 98.61402893066406,
            55.3392333984375,    -33.17860412597656, -46.03901290893555,
            -61.47925567626953,  64.26514434814453,  21.469341278076172,
            -31.514690399169922, -41.27694320678711, -65.59529113769531
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'leakyRelu',
        'arguments': [
          {'input': 'leakyReluInput'},
          {'options': {'alpha': -97.70109193608776}}
        ],
        'outputs': 'leakyReluOutput'
      }],
      'expectedOutputs': {
        'leakyReluOutput': {
          'data': [
            1861.5615234375,    50.77590560913086,  6795.07861328125,
            7872.19970703125,   8832.2861328125,    76.02884674072266,
            66.33873748779297,  8216.8447265625,    1679.580810546875,
            8546.5244140625,    333.7925109863281,  2224.884521484375,
            245.17982482910156, 18.933284759521484, 98.61402893066406,
            55.3392333984375,   3241.5859375,       4498.06201171875,
            6006.5908203125,    64.26514434814453,  21.469341278076172,
            3079.019775390625,  4032.802490234375,  6408.73193359375
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'leakyRelu float32 2D tensor positive options.alpha',
    'graph': {
      'inputs': {
        'leakyReluInput': {
          'data': [
            -19.053640365600586, 50.77590560913086,  -69.54966735839844,
            -80.57432556152344,  -90.4011001586914,  76.02884674072266,
            66.33873748779297,   -84.10186767578125, -17.19101333618164,
            -87.47624206542969,  -3.416466474533081, -22.77235984802246,
            -2.509489059448242,  18.933284759521484, 98.61402893066406,
            55.3392333984375,    -33.17860412597656, -46.03901290893555,
            -61.47925567626953,  64.26514434814453,  21.469341278076172,
            -31.514690399169922, -41.27694320678711, -65.59529113769531
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'leakyRelu',
        'arguments': [
          {'input': 'leakyReluInput'},
          {'options': {'alpha': 35.799162942273234}}
        ],
        'outputs': 'leakyReluOutput'
      }],
      'expectedOutputs': {
        'leakyReluOutput': {
          'data': [
            -682.1043701171875,  50.77590560913086,   -2489.81982421875,
            -2884.493408203125,  -3236.28369140625,   76.02884674072266,
            66.33873748779297,   -3010.776611328125,  -615.4238891601562,
            -3131.576416015625,  -122.306640625,      -815.2314453125,
            -89.83760833740234,  18.933284759521484,  98.61402893066406,
            55.3392333984375,    -1187.7662353515625, -1648.158203125,
            -2200.906005859375,  64.26514434814453,   21.469341278076172,
            -1128.1995849609375, -1477.6800537109375, -2348.256591796875
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'leakyRelu float32 5D tensor options.alpha=0.0',
    'graph': {
      'inputs': {
        'leakyReluInput': {
          'data': [
            -19.053640365600586, 50.77590560913086,  -69.54966735839844,
            -80.57432556152344,  -90.4011001586914,  76.02884674072266,
            66.33873748779297,   -84.10186767578125, -17.19101333618164,
            -87.47624206542969,  -3.416466474533081, -22.77235984802246,
            -2.509489059448242,  18.933284759521484, 98.61402893066406,
            55.3392333984375,    -33.17860412597656, -46.03901290893555,
            -61.47925567626953,  64.26514434814453,  21.469341278076172,
            -31.514690399169922, -41.27694320678711, -65.59529113769531
          ],
          'descriptor': {'dimensions': [1, 2, 1, 3, 4], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'leakyRelu',
        'arguments': [{'input': 'leakyReluInput'}, {'options': {'alpha': 0}}],
        'outputs': 'leakyReluOutput'
      }],
      'expectedOutputs': {
        'leakyReluOutput': {
          'data': [
            0,
            50.77590560913086,
            0,
            0,
            0,
            76.02884674072266,
            66.33873748779297,
            0,
            0,
            0,
            0,
            0,
            0,
            18.933284759521484,
            98.61402893066406,
            55.3392333984375,
            0,
            0,
            0,
            64.26514434814453,
            21.469341278076172,
            0,
            0,
            0
          ],
          'descriptor': {'dimensions': [1, 2, 1, 3, 4], 'dataType': 'float32'}
        }
      }
    }
  }
];

if (navigator.ml) {
  leakyReluTests.forEach((test) => {
    webnn_conformance_test(
        buildGraphAndCompute, getLeakyReluPrecisionTolerance, test);
  });
} else {
  test(() => assert_implements(navigator.ml, 'missing navigator.ml'));
}
