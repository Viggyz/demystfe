<script setup>
import { ref } from 'vue';

import { getBalanceSheet, submitApplication } from "./services.js"

const loanDetails = ref({
  name: null,
  amount: null,
  provider: null,
})

async function handleLoanSubmit(e) {
  e.preventDefault();
  // Would require actual code to authenticate user on accounting platform (say Xero)
  // Assuming successfuly linked here and we have an accessToken
  const accessToken = 'asu128esah123';
  try {
    const balanceSheet = await getBalanceSheet(loanDetails.value.provider, accessToken);
    console.log(balanceSheet);
    await submitApplication(
      loanDetails.value.name,
      loanDetails.value.amount,
      2021,
      balanceSheet.data
    )
    alert("Loan approved!");
  }
  catch(e) {
    alert(e ?? 'Something went wrong!');
  }
}
</script>

<template>
  <header>
    <div class="container">
      <div class="jumbotron"><h1>Loan Application</h1></div>
    </div>
  </header> 

  <main>
    <div class="container">
      <form @submit.stop="handleLoanSubmit">
        <div class="form-group">
          <label for="exampleBusinessName">Business Name</label>
          <input type="text" v-model="loanDetails.name" class="form-control" id="exampleBusinessName" aria-describedby="businessName" placeholder="Enter Business Name">
        </div>
        <div class="form-group">
          <label for="exampleLoanAmount">Loan Amount</label>
          <input type="number" v-model="loanDetails.amount" class="form-control" id="exampleLoanAmount" placeholder="Amount">
        </div>
        <div class="form-group">
          <div>
            <label>Fetch Balance Sheet</label>
          </div>
          <div class="btn-group p-2">
            <button type="button" class="btn btn-secondary" @click="loanDetails.provider='XERO'">Xero</button>
            <button type="button" class="btn btn-secondary" @click="loanDetails.provider='MYOB'">MYOB</button>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    </main>
</template>

<style scoped>
</style>
