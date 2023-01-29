import { Component, createSignal } from 'solid-js';

import IPlanet from '@interfaces/IPlanet';

const FactsCard: Component<IPlanet> = ({ name, overview }) => {
  const [activeBtn, setActiveBtn] = createSignal('one');

  const activeBtnClass = 'bg-azure-blue';

  return (
    <>
      <section class='flex flex-col gap-4 max-w-sm mx-auto'>
        <h1 class='uppercase'>{name}</h1>
        <p>{overview.content}</p>

        <p>{overview.source}</p>

        <div class='flex flex-col gap-4'>
          <button
            class='flex justify-start items-center gap-8 pl-10 py-2 border border-grey/50 hover:bg-azure-blue'
            classList={{ [activeBtnClass]: activeBtn() === 'one' }}
            onClick={() => setActiveBtn('one')}
          >
            <span>
              <h3 class='opacity-50'>01</h3>
            </span>
            <span class='uppercase text-white'>
              <h3>Overview</h3>
            </span>
          </button>

          <button
            class='flex justify-start items-center gap-8 pl-10 py-2 border border-grey/50 hover:bg-azure-blue'
            classList={{ [activeBtnClass]: activeBtn() === 'two' }}
            onClick={() => setActiveBtn('two')}
          >
            <span>
              <h3 class='opacity-50'>02</h3>
            </span>
            <span class='uppercase text-white'>
              <h3>Internal Structure</h3>
            </span>
          </button>

          <button
            class='flex justify-start items-center gap-8 pl-10 py-2 border border-grey/50 hover:bg-azure-blue'
            classList={{ [activeBtnClass]: activeBtn() === 'three' }}
            onClick={() => setActiveBtn('three')}
          >
            <span>
              <h3 class='opacity-50'>03</h3>
            </span>
            <span class='uppercase text-white'>
              <h3>Surface Geology</h3>
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default FactsCard;
