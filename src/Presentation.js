import ReactGoogleSlides from "react-google-slides";

const Presentation = (link) => {
    return (
      <ReactGoogleSlides
        width={640}
        height={480}
        slidesLink={link}
        slideDuration={5}
        position={1}
        showControls
        loop
      />
    );
  }

export default Presentation;