import BearAudio from '../assets/audio/bear.mp3';
import BearAudioOgg from '../assets/audio/bear.ogg';
import { useState } from 'react';

function BearMating(): React.JSX.Element {
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);

  const toggleTranscript = (): void => {
    setIsTranscriptVisible((prevVisible) => !prevVisible);
  };

  return (
    <>
      <h3>Mating rituals</h3>
      <p>
        Bears are romantic creatures by nature, and will naturally look for a
        mate that they can spend the rest of their lives with. They will woo a
        potential suitor by making their dwelling look attractive — for example
        with cave paintings or a bed of reeds in the case of a wild bear, and
        mood lighting and a Michael Bublé CD in the case of an urban bear.
      </p>
      <label id="audio-label" htmlFor="audio">
        Listen to a bear sound
      </label>
      <audio id="audio" controls aria-labelledby="audio-label">
        <source src={BearAudio} type="audio/mp3" />
        <source src={BearAudioOgg} type="audio/ogg" />
        <p>It looks like your browser doesn't support HTML5 audio players.</p>
      </audio>
      <div className="transcript-container">
        <button onClick={toggleTranscript} aria-expanded={isTranscriptVisible}>
          {isTranscriptVisible ? 'Hide Transcript' : 'Show Transcript'}
        </button>
        <section
          className={`transcript ${isTranscriptVisible ? 'visible' : 'hidden'}`}
        >
          <p>
            <strong>Narrator</strong>: This isn't really an audio fact file
            about bears, but it is an audio file you can transcribe.
          </p>
        </section>
      </div>
    </>
  );
}

export default BearMating;
