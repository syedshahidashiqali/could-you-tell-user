
export default function useStepForm({nextStep}) {
    const changeStep = ()=> {
        nextStep();
        window.scrollTo(0,0);
    };
  return {
    changeStep,
  }
}
