type authInputParams = {
  name: string;
  label: string;
  type: 'EMAIL' | 'PASSWORD';
  control: any;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

function ReportInput() {
  return <div>Enter</div>;
}

export default ReportInput;
