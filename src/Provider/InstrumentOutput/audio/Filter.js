import Tuna from "tunajs";

export const Filter = audioContext => {
  let filters = [];
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
  const me = {
    setUpFilters: (filterConfigs, outputTo) => {
      var filter;
      let previousFilter;

      filterConfigs.forEach((filterConfig, key) => {
        if (filterConfig.active === true) {
          if (filterConfig.tunaType !== undefined) {
            filter = me.createTunaFilter(filterConfig);
          } else {
            filter = me.createFilter(filterConfig);
          }

          filters.push(filter);
        }
      });

      //outputTo.connect(filters[0]);
      /* { active: 'true', type: 'filter', props: { type: 'lowpass', value: 1000, Q: 10 } },
       */
      filters.forEach(filter => {
        if (typeof previousFilter !== "undefined") {
          previousFilter.connect(filter);
        }

        previousFilter = filter;
      });

      //filters[filters.length - 1].connect(context.destination);
      try {
        if (filters.length === 0)
          throw Error("We need a solution where we can use no filters on an Instrument");

        filters[filters.length - 1].connect(outputTo);
        //outputTo.connect(context.destination);
        filters = filters ? filters : [];
        return filters;

      } catch (e) {
        console.log("-----> Error: " + e);
        return [];
      }
    },

    createFilter: filterConfig => {
      var filter = audioContext.createBiquadFilter();

      filter.type = filterConfig.props.type;
      filter.frequency.value = filterConfig.props.value;
      filter.Q.value = filterConfig.props.Q;
      /* = Math.pow(2, currentFilterCutoff);*/
      return filter;
    },

    createTunaFilter: filterConfig => {
      var tuna = new Tuna(audioContext);

      return new tuna[filterConfig.tunaType](filterConfig.props);
    }
  };
  return me;
};
