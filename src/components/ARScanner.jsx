import React, { useEffect, useRef, useState } from 'react';

// Define object details (you can expand this as needed)
const objectDetails = {
  person: {
    name: "Person",
    description: "A human being, typically one of the species Homo sapiens.",
    image: "https://example.com/person.jpg"
  },
  cup: {
    name: "Cup",
    description: "A small, typically round container used for drinking liquids.",
    image: "https://example.com/cup.jpg"
  },
  // Add more objects...
};

const ARObjectDetection = () => {
  const [overlayContent, setOverlayContent] = useState('');
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  let model = null;

  // Load the model
  useEffect(() => {
    const loadModel = async () => {
      model = await tf.loadGraphModel('/model/model.json'); // Change this to the path where your model is stored
      startCamera();
    };

    loadModel();
  }, []);

  // Start camera
  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          detectFrame();
        };
      });
  };

  // Detect objects in the frame
  const detectFrame = () => {
    model.executeAsync(videoRef.current).then((predictions) => {
      if (predictions.length > 0) {
        const object = predictions[0]; // Pick first detected object
        const label = object.class;

        if (objectDetails[label]) {
          const details = objectDetails[label];
          setOverlayContent(
            <>
              <h3>{details.name}</h3>
              <p>{details.description}</p>
              <img src={details.image} alt={details.name} style={{ width: '100px', height: 'auto' }} />
            </>
          );
          speakText(`This is a ${details.name}. ${details.description}`);
        } else {
          setOverlayContent(<p>Detected: {label}</p>);
          speakText(`This looks like a ${label}`);
        }
      }

      requestAnimationFrame(detectFrame);
    });
  };

  // Text-to-speech function
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.cancel(); // Cancel any previous speech
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} width="100%" height="auto" autoPlay muted />
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          borderRadius: '5px',
        }}
      >
        {overlayContent}
      </div>
    </div>
  );
};

export default ARObjectDetection;
