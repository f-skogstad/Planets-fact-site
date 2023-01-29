import { Component } from 'solid-js';

import IPlanet from '@interfaces/IPlanet';

const FactsRow: Component<IPlanet> = ({
  rotation,
  revolution,
  radius,
  temperature,
}) => {
  return (
    <section class='flex justify-center items-center gap-10 w-full'>
      <div class='flex-1 pl-10 py-5 border border-grey/50'>
        <h3 class='uppercase opacity-50 pb-3'>Rotation Time</h3>
        <h2 class='uppercase'>{rotation}</h2>
      </div>
      <div class='flex-1 pl-10 py-5 border border-grey/50'>
        <h3 class='uppercase opacity-50 pb-3'>Revolution Time</h3>
        <h2 class='uppercase'>{revolution}</h2>
      </div>
      <div class='flex-1 pl-10 py-5 border border-grey/50'>
        <h3 class='uppercase opacity-50 pb-3'>Radius</h3>
        <h2 class='uppercase'>{radius}</h2>
      </div>
      <div class='flex-1 pl-10 py-5 border border-grey/50'>
        <h3 class='uppercase opacity-50 pb-3'>Average temp.</h3>
        <h2 class='uppercase'>{temperature}</h2>
      </div>
    </section>
  );
};

export default FactsRow;
