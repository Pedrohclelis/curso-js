const Modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },

    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    },

    save(){
        let des = document.querySelector('#description')
        let amo = document.querySelector('#amount')
        let date = document.querySelector('#date')
        let obj = {id: `${transactions.length}`, description: `${des}`, amount: `${amo}`, date: `${date}`}
        transactions.push(obj)
        Modal.close()
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "- " : ""
        value = String(value).replace(/\D/g, "") 
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
        return signal+value
    }
}

//Array
const transactions = [
    {description: 'Luz', amount: -50000, date: '05/11/2021'}, 
    {description: 'Website', amount: 500000, date: '05/11/2021'},
    {description: 'Internet', amount: -2000, date: '05/11/2021'},
    {description: 'App', amount: 75000, date: '05/11/2021'}, 
]

const Transaction = {
    all: transactions,

    add(transaction){
        Transaction.all.push(transaction)

        console.log(Transaction.all)
        App.reload()
    },

    remove(index){
        Transaction.all.splice(index, 1)
        App.reload()
    },

    incomes(){
        let income = 0

        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0){
                income += transaction.amount
            }
        })

        return income
    },

    expenses(){
        let expense = 0

        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0){
                expense += transaction.amount
            }
        })

        return expense
    },

    total(){
        return Transaction.incomes() + Transaction.expenses()
    }

}

const DOM = {
    transactionsContainer: document.querySelector('table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `<tr>
                        <td class="description"> ${transaction.description} </td>
                        <td class=${CSSclass}> ${amount} </td>
                        <td class="date"> ${transaction.date} </td>
                        <td><img src="assets/minus.svg" alt="table-expense-minus"></td>
                      </tr>`
        return html
    },

    updateBalance(){
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ''
    }
}

const Form = {
    submit(event){
        event.preventDefault(){
                
        }
    }
}

const App = {
    
    init(){
        //Passar cada transaction do array transactions pro html do site
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        //Sincronizar os valores 
        DOM.updateBalance()
    },

    reload(){
        //Limpar transacoes e reiniciar
        DOM.clearTransactions()
        App.init()
    },
}


App.init()


