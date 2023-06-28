const Modal = ({ children }) => {
  return (
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
        {/* {console.log('modal')} */}
      </div>
    </div>
  );
};

export default Modal;
