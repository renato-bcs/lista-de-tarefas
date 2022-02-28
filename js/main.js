const Main = {

    tasks: [],

    init: function() {
        this.cacheSelectors()        
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
    },

    cacheSelectors: function() {
        this.$checkButtons = document.querySelectorAll('.check')
        this.$removeButtons = document.querySelectorAll('.remove')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
    },

    bindEvents: function() {
        const self = this
        
        this.$checkButtons.forEach(function(button) {
            button.onclick = self.Events.checkButton_click.bind(self)
        })

        this.$removeButtons.forEach(function(button) {
            button.onclick = self.Events.removeButton_click.bind(self)
        })
        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(self)
    },

    getStoraged: function () {
        const tasks = localStorage.getItem('tasks')
        if(tasks != null) {
            this.tasks = JSON.parse(tasks)
         }
    },

    buildTasks: function (tasks) {
        this.tasks.forEach(item => {
            this.createTaskLI(item)
        })
    },


    createTaskLI: function (item) {
        let classList = ''
        if (item.done === true) {
            classList = 'done'
        }
        this.$list.innerHTML +=
        `
            <li class="${classList}" data-task="${item.task}">
                <div class="check"></div>
                <label class="task">
                    ${item.task}
                </label>
                <button class="remove"></button>
            </li>
        `
        this.cacheSelectors()        
        this.bindEvents()
    },

    removeItemWithValue: function (value) {
        const newTasksState = this.tasks.filter(item => item.task!=value)
        localStorage.setItem('tasks', JSON.stringify(newTasksState))
        this.tasks = newTasksState
    },

    Events: {
        checkButton_click: function (e) {
            const li = e.target.parentElement
            const isDone = li.classList.contains('done')
            const value = li.dataset['task']
            
            this.tasks = this.tasks.map((item) => {
                if (item.task === value){
                    item.done = !isDone
                }
                return item
            })

            localStorage.setItem('tasks', JSON.stringify(this.tasks))
           
            if(!isDone) {
                return li.classList.add('done')
            } 
            li.classList.remove('done')
        },

        inputTask_keypress: function(e) {
            const key = e.key
            const targetValue = e.target.value

            if(key === 'Enter') {
                const item = {
                    task : targetValue,
                    done: false
                }

                this.createTaskLI(item)   
                e.target.value = ''

                this.tasks.push(item)
                localStorage.setItem('tasks', JSON.stringify(this.tasks))
            }

        },

        removeButton_click: function (e) {
            const li = e.target.parentElement
            li.classList.add('removed')
            
            const value = e.target.parentElement.dataset['task']
            console.log(value)
            this.removeItemWithValue(value)
    
            setTimeout(function(){
                li.classList.add('hidden')
                console.log('tome')
            }, 300)
        }
    }

}

Main.init()