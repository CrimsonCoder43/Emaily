const Payments = () => {
  const handleClick = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        console.error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <button
      className='btn btn-success w-full justify-start'
      onClick={handleClick}
    >
      Add Credits
    </button>
  );
};

export default Payments;
