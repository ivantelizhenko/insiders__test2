import { useParams } from 'react-router';

function Page() {
  const { userId } = useParams();

  return <div>{userId}</div>;
}

export default Page;
