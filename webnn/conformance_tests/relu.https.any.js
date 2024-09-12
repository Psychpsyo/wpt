// META: title=test WebNN API relu operation
// META: global=window,dedicatedworker
// META: variant=?cpu
// META: variant=?gpu
// META: variant=?npu
// META: script=../resources/utils.js
// META: timeout=long

'use strict';

// https://www.w3.org/TR/webnn/#api-mlgraphbuilder-relu-method
// Compute the rectified linear function of the input tensor.
//
// MLOperand relu(MLOperand input);


const getReluPrecisionTolerance = (graphResources) => {
  const toleranceValueDict = {float32: 0, float16: 0};
  const expectedDataType =
      getExpectedDataTypeOfSingleOutput(graphResources.expectedOutputs);
  return {metricType: 'ULP', value: toleranceValueDict[expectedDataType]};
};

const reluTests = [
  {
    'name': 'relu float32 1D constant tensor',
    'graph': {
      'inputs': {
        'reluInput': {
          'data': [
            79.04724884033203,  2.2503609657287598,  80.73938751220703,
            63.9039192199707,   77.67340850830078,   -71.0915756225586,
            -82.74703216552734, -26.81442642211914,  -99.16788482666016,
            -35.71083450317383, 18.361658096313477,  -37.36091613769531,
            -52.8386116027832,  -10.408374786376953, 60.6029167175293,
            -13.64419937133789, -76.5425033569336,   -8.132338523864746,
            51.51447296142578,  -51.63370132446289,  -64.56800079345703,
            -5.093302249908447, 15.354103088378906,  90.03858947753906
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'},
          'constant': true
        }
      },
      'operators': [{
        'name': 'relu',
        'arguments': [{'input': 'reluInput'}],
        'outputs': 'reluOutput'
      }],
      'expectedOutputs': {
        'reluOutput': {
          'data': [
            79.04724884033203,
            2.2503609657287598,
            80.73938751220703,
            63.9039192199707,
            77.67340850830078,
            0,
            0,
            0,
            0,
            0,
            18.361658096313477,
            0,
            0,
            0,
            60.6029167175293,
            0,
            0,
            0,
            51.51447296142578,
            0,
            0,
            0,
            15.354103088378906,
            90.03858947753906
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'relu float32 0D tensor',
    'graph': {
      'inputs': {
        'reluInput': {
          'data': [79.04724884033203],
          'descriptor': {'dimensions': [], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'relu',
        'arguments': [{'input': 'reluInput'}],
        'outputs': 'reluOutput'
      }],
      'expectedOutputs': {
        'reluOutput': {
          'data': [
            79.04724884033203,
          ],
          'descriptor': {'dimensions': [], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'relu float32 1D tensor',
    'graph': {
      'inputs': {
        'reluInput': {
          'data': [
            79.04724884033203,  2.2503609657287598,  80.73938751220703,
            63.9039192199707,   77.67340850830078,   -71.0915756225586,
            -82.74703216552734, -26.81442642211914,  -99.16788482666016,
            -35.71083450317383, 18.361658096313477,  -37.36091613769531,
            -52.8386116027832,  -10.408374786376953, 60.6029167175293,
            -13.64419937133789, -76.5425033569336,   -8.132338523864746,
            51.51447296142578,  -51.63370132446289,  -64.56800079345703,
            -5.093302249908447, 15.354103088378906,  90.03858947753906
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'relu',
        'arguments': [{'input': 'reluInput'}],
        'outputs': 'reluOutput'
      }],
      'expectedOutputs': {
        'reluOutput': {
          'data': [
            79.04724884033203,
            2.2503609657287598,
            80.73938751220703,
            63.9039192199707,
            77.67340850830078,
            0,
            0,
            0,
            0,
            0,
            18.361658096313477,
            0,
            0,
            0,
            60.6029167175293,
            0,
            0,
            0,
            51.51447296142578,
            0,
            0,
            0,
            15.354103088378906,
            90.03858947753906
          ],
          'descriptor': {'dimensions': [24], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'relu float32 2D tensor',
    'graph': {
      'inputs': {
        'reluInput': {
          'data': [
            79.04724884033203,  2.2503609657287598,  80.73938751220703,
            63.9039192199707,   77.67340850830078,   -71.0915756225586,
            -82.74703216552734, -26.81442642211914,  -99.16788482666016,
            -35.71083450317383, 18.361658096313477,  -37.36091613769531,
            -52.8386116027832,  -10.408374786376953, 60.6029167175293,
            -13.64419937133789, -76.5425033569336,   -8.132338523864746,
            51.51447296142578,  -51.63370132446289,  -64.56800079345703,
            -5.093302249908447, 15.354103088378906,  90.03858947753906
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'relu',
        'arguments': [{'input': 'reluInput'}],
        'outputs': 'reluOutput'
      }],
      'expectedOutputs': {
        'reluOutput': {
          'data': [
            79.04724884033203,
            2.2503609657287598,
            80.73938751220703,
            63.9039192199707,
            77.67340850830078,
            0,
            0,
            0,
            0,
            0,
            18.361658096313477,
            0,
            0,
            0,
            60.6029167175293,
            0,
            0,
            0,
            51.51447296142578,
            0,
            0,
            0,
            15.354103088378906,
            90.03858947753906
          ],
          'descriptor': {'dimensions': [4, 6], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'relu float32 3D tensor',
    'graph': {
      'inputs': {
        'reluInput': {
          'data': [
            79.04724884033203,  2.2503609657287598,  80.73938751220703,
            63.9039192199707,   77.67340850830078,   -71.0915756225586,
            -82.74703216552734, -26.81442642211914,  -99.16788482666016,
            -35.71083450317383, 18.361658096313477,  -37.36091613769531,
            -52.8386116027832,  -10.408374786376953, 60.6029167175293,
            -13.64419937133789, -76.5425033569336,   -8.132338523864746,
            51.51447296142578,  -51.63370132446289,  -64.56800079345703,
            -5.093302249908447, 15.354103088378906,  90.03858947753906
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'relu',
        'arguments': [{'input': 'reluInput'}],
        'outputs': 'reluOutput'
      }],
      'expectedOutputs': {
        'reluOutput': {
          'data': [
            79.04724884033203,
            2.2503609657287598,
            80.73938751220703,
            63.9039192199707,
            77.67340850830078,
            0,
            0,
            0,
            0,
            0,
            18.361658096313477,
            0,
            0,
            0,
            60.6029167175293,
            0,
            0,
            0,
            51.51447296142578,
            0,
            0,
            0,
            15.354103088378906,
            90.03858947753906
          ],
          'descriptor': {'dimensions': [2, 3, 4], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'relu float32 4D tensor',
    'graph': {
      'inputs': {
        'reluInput': {
          'data': [
            79.04724884033203,  2.2503609657287598,  80.73938751220703,
            63.9039192199707,   77.67340850830078,   -71.0915756225586,
            -82.74703216552734, -26.81442642211914,  -99.16788482666016,
            -35.71083450317383, 18.361658096313477,  -37.36091613769531,
            -52.8386116027832,  -10.408374786376953, 60.6029167175293,
            -13.64419937133789, -76.5425033569336,   -8.132338523864746,
            51.51447296142578,  -51.63370132446289,  -64.56800079345703,
            -5.093302249908447, 15.354103088378906,  90.03858947753906
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'relu',
        'arguments': [{'input': 'reluInput'}],
        'outputs': 'reluOutput'
      }],
      'expectedOutputs': {
        'reluOutput': {
          'data': [
            79.04724884033203,
            2.2503609657287598,
            80.73938751220703,
            63.9039192199707,
            77.67340850830078,
            0,
            0,
            0,
            0,
            0,
            18.361658096313477,
            0,
            0,
            0,
            60.6029167175293,
            0,
            0,
            0,
            51.51447296142578,
            0,
            0,
            0,
            15.354103088378906,
            90.03858947753906
          ],
          'descriptor': {'dimensions': [2, 2, 2, 3], 'dataType': 'float32'}
        }
      }
    }
  },
  {
    'name': 'relu float32 5D tensor',
    'graph': {
      'inputs': {
        'reluInput': {
          'data': [
            79.04724884033203,  2.2503609657287598,  80.73938751220703,
            63.9039192199707,   77.67340850830078,   -71.0915756225586,
            -82.74703216552734, -26.81442642211914,  -99.16788482666016,
            -35.71083450317383, 18.361658096313477,  -37.36091613769531,
            -52.8386116027832,  -10.408374786376953, 60.6029167175293,
            -13.64419937133789, -76.5425033569336,   -8.132338523864746,
            51.51447296142578,  -51.63370132446289,  -64.56800079345703,
            -5.093302249908447, 15.354103088378906,  90.03858947753906
          ],
          'descriptor': {'dimensions': [2, 1, 4, 1, 3], 'dataType': 'float32'}
        }
      },
      'operators': [{
        'name': 'relu',
        'arguments': [{'input': 'reluInput'}],
        'outputs': 'reluOutput'
      }],
      'expectedOutputs': {
        'reluOutput': {
          'data': [
            79.04724884033203,
            2.2503609657287598,
            80.73938751220703,
            63.9039192199707,
            77.67340850830078,
            0,
            0,
            0,
            0,
            0,
            18.361658096313477,
            0,
            0,
            0,
            60.6029167175293,
            0,
            0,
            0,
            51.51447296142578,
            0,
            0,
            0,
            15.354103088378906,
            90.03858947753906
          ],
          'descriptor': {'dimensions': [2, 1, 4, 1, 3], 'dataType': 'float32'}
        }
      }
    }
  }
];

if (navigator.ml) {
  reluTests.forEach((test) => {
    webnn_conformance_test(
        buildGraphAndCompute, getReluPrecisionTolerance, test);
  });
} else {
  test(() => assert_implements(navigator.ml, 'missing navigator.ml'));
}
