import {useRouter} from 'next/router';
const activity = () => {
  const router = useRouter();
  const {id} = router.query;

  return (
    <div>
      <h1>Activity Detail Page</h1>
      <p>ID: {id} </p>
    </div>
  );
};

export default activity;
