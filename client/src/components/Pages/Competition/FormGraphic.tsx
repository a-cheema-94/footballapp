import { Stack } from "react-bootstrap";

type Props = {
  form: string
}

const FORM_CIRCLE_DIMENSIONS = 25

const FormGraphic = ({ form }: Props) => {
  const formArray = form.split('');

  const getResultColor = (result: string): string => {
    let resultCircleColor: string = '';
    switch(result) {
      case 'W':
        resultCircleColor = 'green';
        break;
      case 'D':
        resultCircleColor = 'gray';
        break;
      case 'L':
        resultCircleColor = 'red';
        break;
    }
    return resultCircleColor;
  }
  
  return (
    <Stack direction="horizontal" className="gap-1">{formArray.map((result, index) => (
      <span key={index} style={{ height: FORM_CIRCLE_DIMENSIONS, width: FORM_CIRCLE_DIMENSIONS }} className={`rounded-circle text-center text-white bg-${getResultColor(result)}-600`}>{result}</span>
    ))}</Stack>
  )
}

export default FormGraphic