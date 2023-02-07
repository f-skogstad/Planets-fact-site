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
        break;
    }
  });

  return (
    <section class='lg:flex items-center mb-4 md:mb-6 lg:mb-20 mt-10 md:mt-20'>
      <div class='flex-1'>
        <img
          src={planetImg()}
          alt='planet-mercury'
          class='max-h-96 lg:max-w-md mx-auto'
        />
      </div>

      <div class='flex-1'>
        <div class='mx-auto lg:max-w-md'>
          {/* Header text */}
          <div class='md:flex items-center gap-4 lg:block'>
            <div class='flex-1'>
              <h1 class='uppercase'>{name}</h1>
              <p>{content}</p>

              {/* Source link */}
              <div class='flex gap-2 my-2'>
                <p class='opacity-50'>Source:</p>
                <p class='opacity-50 inline-block'>
                  <a href={source()} class='font-bold underline flex gap-1'>
                    Wikipedia
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-4 h-4 text-white'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
                      />
                    </svg>
                  </a>
                </p>
              </div>
            </div>

            {/* Button group */}
            <div class='flex-1 flex flex-col gap-4'>
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
        </div>
      </div>
    </section>
  );
};

export default FactsCard;
