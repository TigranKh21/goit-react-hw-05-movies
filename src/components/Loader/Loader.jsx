import { Triangle } from 'react-loader-spinner';

export const Loader = () => {
  const styleObj = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <div style={styleObj}>
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#00008b"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
