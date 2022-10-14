import { useParams } from "@remix-run/react";
const dynamic = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { someId } = useParams(); // react router useParams hook to get dynamic parameter
  return <div>I am dynamic {someId}</div>;
};

export default dynamic;
