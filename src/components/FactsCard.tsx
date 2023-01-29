import { Component, createSignal, createEffect } from 'solid-js';
import IPlanet from '@interfaces/IPlanet';

const FactsCard: Component<IPlanet> = ({
  name,
  overview,
  structure,
  geology,
}) => {
  const [activeBtn, setActiveBtn] = createSignal('one');
  const [content, setContent] = createSignal(overview.content);
  const [source, setSource] = createSignal(overview.source);

  const activeBtnStyle =
    'flex justify-start items-center gap-8 pl-10 py-2 border border-grey/50 bg-azure-blue hover:bg-azure-blue';
  const btnStyle =
    'flex justify-start items-center gap-8 pl-10 py-2 border border-grey/50 hover:bg-dark-grey';

  createEffect(() => {
    switch (activeBtn()) {
      case 'one':
        setContent(overview.content);
        setSource(overview.source);
        break;
      case 'two':
        setContent(structure.content);
        setSource(structure.source);
        break;
      case 'three':
        setContent(geology.content);
        setSource(geology.source);
      default:
        break;
    }
  });

  return (
    <>
      <section class='flex flex-col gap-4 max-w-sm mx-auto'>
        <h1 class='uppercase'>{name}</h1>
        <p>{content}</p>

        <p>{source}</p>

        <div class='flex flex-col gap-4'>
          <button
            class={activeBtn() === 'one' ? activeBtnStyle : btnStyle}
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
            class={activeBtn() === 'two' ? activeBtnStyle : btnStyle}
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
            class={activeBtn() === 'three' ? activeBtnStyle : btnStyle}
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
