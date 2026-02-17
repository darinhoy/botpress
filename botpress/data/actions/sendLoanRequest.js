const axios = require('axios');

const sendLoanRequest = async (state, event) => {
  try {
    const response = await axios.post('http://localhost:3000/api/loan', {
      botpress_user_id: event.user.id,
      name: state.name,
      phone: state.phone,
      amount: state.amount,
      salary: state.salary
    });
    state.loanResponse = response.data.message;
  } catch (err) {
    state.loanResponse = '❌Failed to send loan request.';
    console.error(err);
  }
  return state;
}

return sendLoanRequest(state, event);
