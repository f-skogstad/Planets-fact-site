import { Component } from 'solid-js';

import IPlanet from '@interfaces/IPlanet';

const FactsRow: Component<IPlanet> = ({
  rotation,
  revolution,
  radius,
  temperature,
}) => {
  return (
    <section class='grid md:grid-cols-4 gap-2 md:gap-4'>
      <div class='w-full pl-5 pr-10 lg:pl-10 lg:pr-20 lg:py-4  border border-grey/50'>
        <h3 class='uppercase opacity-50 mb-3'>Rotation Time</h3>
        <h2 class='uppercase'>{rotation}</h2>
      </div>
      <div class=' w-full pl-5 pr-10 lg:pl-10 lg:pr-20 lg:py-4 min-h-full border border-grey/50'>
        <h3 class='uppercase opacity-50 mb-3'>Revolution Time</h3>
        <h2 class='uppercase'>{revolution}</h2>
      </div>
      <div class='w-full pl-5 pr-10 lg:pl-10 lg:pr-20 lg:py-4 min-h-full border border-grey/50'>
        <h3 class='uppercase opacity-50 mb-3'>Radius</h3>
        <h2 class='uppercase'>{radius}</h2>
      </div>
      <div class='w-full pl-5 pr-10 lg:pl-10 lg:pr-20 lg:py-4 min-h-full border border-grey/50'>
        <h3 class='uppercase opacity-50 mb-3'>Average temp.</h3>
        <h2 class='uppercase'>{temperature}</h2>
      </div>
    </section>
  );
};

export default FactsRow;
