"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = void 0;

var _tunajs = _interopRequireDefault(require("tunajs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Filter = function Filter(audioContext) {
  var filters = [];
  /*******  Apply Filter Envelope
    var filterAttackLevel = currentFilterEnv*72;  // Range: 0-7200: 6-octave range
    var filterSustainLevel = filterAttackLevel* currentFilterEnvS / 100.0; // range: 0-7200
    var filterAttackEnd = (currentFilterEnvA/20.0);
     /*	console.log( "filterAttackLevel: " + filterAttackLevel +
     " filterSustainLevel: " + filterSustainLevel +
     " filterAttackEnd: " + filterAttackEnd);
     * /
    if (!filterAttackEnd)
        filterAttackEnd=0.05; // tweak to get target decay to work properly
     this.filter1.detune.setValueAtTime( 0, time );
    this.filter1.detune.linearRampToValueAtTime( filterAttackLevel, time+filterAttackEnd );
    this.filter2.detune.setValueAtTime( 0, time );
    this.filter2.detune.linearRampToValueAtTime( filterAttackLevel, time+filterAttackEnd );
    this.filter1.detune.setTargetAtTime( filterSustainLevel, time+filterAttackEnd, (currentFilterEnvD/100.0) );
    this.filter2.detune.setTargetAtTime( filterSustainLevel, time+filterAttackEnd, (currentFilterEnvD/100.0) );
      end Filter envelope */

  var me = {
    setUpFilters: function setUpFilters(filterConfigs, outputTo) {
      var filter;
      var previousFilter;
      filterConfigs.forEach(function (filterConfig, key) {
        if (filterConfig.active === true) {
          if (filterConfig.tunaType !== undefined) {
            filter = me.createTunaFilter(filterConfig);
          } else {
            filter = me.createFilter(filterConfig);
          }

          filters.push(filter);
        }
      }); //outputTo.connect(filters[0]);

      /* { active: 'true', type: 'filter', props: { type: 'lowpass', value: 1000, Q: 10 } },
       */

      filters.forEach(function (filter) {
        if (typeof previousFilter !== "undefined") {
          previousFilter.connect(filter);
        }

        previousFilter = filter;
      }); //filters[filters.length - 1].connect(context.destination);

      try {
        if (filters.length === 0) throw Error("We need a solution where we can use no filters on an instrument");
        filters[filters.length - 1].connect(outputTo); //outputTo.connect(context.destination);

        filters = filters ? filters : [];
        return filters;
      } catch (e) {
        console.log("-----> Error: " + e);
        return [];
      }
    },
    createFilter: function createFilter(filterConfig) {
      var filter = audioContext.createBiquadFilter();
      filter.type = filterConfig.props.type;
      filter.frequency.value = filterConfig.props.value;
      filter.Q.value = filterConfig.props.Q;
      /* = Math.pow(2, currentFilterCutoff);*/

      return filter;
    },
    createTunaFilter: function createTunaFilter(filterConfig) {
      var tuna = new _tunajs.default(audioContext);
      return new tuna[filterConfig.tunaType](filterConfig.props);
    }
  };
  return me;
};

exports.Filter = Filter;