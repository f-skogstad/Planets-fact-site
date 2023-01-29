import { Component, createSignal, createEffect } from 'solid-js';
import IPlanet from '@interfaces/IPlanet';

const FactsCard: Component<IPlanet> = ({
  name,
  overview,
  structure,
  geology,
  images,
}) => {
  const [activeBtn, setActiveBtn] = createSignal('one');
  const [content, setContent] = createSignal(overview.content);
  const [source, setSource] = createSignal(overview.source);
  const [planetImg, setPlanetImg] = createSignal(images.planet);

  const activeBtnStyle =
    'flex justify-start items-center gap-8 pl-10 py-2 border border-grey/50 bg-azure-blue hover:bg-azure-blue';
  const btnStyle =
    'flex justify-start items-center gap-8 pl-10 py-2 border border-grey/50 hover:bg-dark-grey';

  createEffect(() => {
    switch (activeBtn()) {
      case 'one':
        setContent(overview.content);
        setSource(overview.source);
        setPlanetImg(images.planet);
        break;
      case 'two':
        setContent(structure.content);
        setSource(structure.source);
        setPlanetImg(images.internal);
        break;
      case 'three':
        setContent(geology.content);
        setSource(geology.source);
        setPlanetImg(images.geology);
      default:
        break;
    }
  });

  return (
    <section class='grid grid-cols-2'>
      <img src={planetImg()} alt='planet-mercury' class='m-auto' />
      <div class='flex flex-col gap-4 max-w-sm mx-auto'>
        <h1 class='uppercase'>{name}</h1>
        <p>{content}</p>

        <div class='flex items-center'>
          <p class='opacity-50'>Source: </p>
          <h4 class='opacity-50'>
            <a href={source()}>Wikipedia</a>
          </h4>
        </div>

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
      </div>
    </section>
  );
};

export default FactsCard;
