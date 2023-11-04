import React, { useState, useEffect } from 'react';

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [organizationBalance, setOrganizationBalance] = useState(() => {
    const storedBalance = localStorage.getItem('organizationBalance');
    return storedBalance ? parseInt(storedBalance) : 348;
  });
  const [message, setMessage] = useState('');
  const goalAmount = 100000;

  const handleDonationChange = (event) => {
    const amount = event.target.value;
    setDonationAmount(amount);
  };

  const handlePay = () => {
    if (donationAmount > 0) {
      const newBalance = organizationBalance + parseInt(donationAmount);
      setOrganizationBalance(newBalance);
      setDonationAmount('');
      setMessage('Thank you for contribution!');
    }
  };

  useEffect(() => {
    localStorage.setItem('organizationBalance', organizationBalance.toString());
  }, [organizationBalance]);

  const progressBarWidth = (organizationBalance / goalAmount) * 100;

  return (
    <main className='Donate'>
      <div>
        <h2 style={{ marginBlock: 20 }}>You can help materially to develop this app</h2>
        <div style={{ fontSize: 18, marginBottom: 10 }}>Enter amount</div>
        <input
          type="text"
          className="customInput"
          onChange={handleDonationChange}
          value={donationAmount}
        />
        <div style={{ display: 'flex', gap: 30, alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
          <div style={{ fontSize: 18 }}>Donate monthly?</div>
          <input type="checkbox" style={{ width: 20, height: 20, cursor: 'pointer' }} />
        </div>
        <button className="submit" onClick={handlePay}>
          Pay
        </button>
      </div>
      <div className="Balance">
        <p className='amount'>Balance of Organization: {organizationBalance}$</p>
        <p className='thanks'>{message}</p>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressBarWidth}%` }}
        ></div>
      </div>
      <p className="goal-amount">
        Goal: {goalAmount}$
      </p>
    </main>
  );
};

export default Donate;
