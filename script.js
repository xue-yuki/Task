 // Initialize data
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        let currentEditTaskId = null;
        let pomodoroInterval = null;
        let timerMode = 'work';
        let timerSeconds = 25 * 60;
        let timerRunning = false;
        let soundEnabled = true;
        let visualEffectsEnabled = true;
        let userName = localStorage.getItem('userName') || 'Shana';
        let currentTheme = localStorage.getItem('appTheme') || 'cyberpunk';
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        
        // Produktif
        const productivityTips = [
            "Teknik Pomodoro: Bekerja selama 25 menit, lalu istirahat 5 menit. Setelah 4 sesi, istirahat lebih lama (15-30 menit).",
            "Buat to-do list di malam hari untuk kegiatan esok hari, agar kamu tidak perlu berpikir lagi saat bangun pagi.",
            "Selesaikan tugas terberat di pagi hari saat energi dan fokusmu masih penuh.",
            "Batasi waktu untuk media sosial. Gunakan fitur timer untuk mengontrol waktu scrolling.",
            "Teknik 2-Menit: Jika ada tugas yang bisa diselesaikan dalam 2 menit, selesaikan segera tanpa menunda.",
            "Kelompokkan tugas sejenis dan kerjakan secara berurutan untuk menghindari context switching.",
            "Tetapkan deadline yang lebih cepat dari deadline sebenarnya untuk mengantisipasi kendala.",
            "Siapkan workspace yang rapi dan nyaman untuk meningkatkan fokus dan produktivitas.",
            "Gunakan teknik Eisenhower Matrix: bagi tugas berdasarkan urgensi dan kepentingannya.",
            "Jangan lupa istirahat! Otak membutuhkan waktu untuk recharge agar tetap produktif."
        ];
        
        // Quotes Motivasi
        const motivationalQuotes = [
            "Haiii sayangkuu Shanaaa~ jangan terlalu keras ya hari ini, inget istirahat biar tetep imut! 💖",
            "Satu langkah kecil aja udah hebat banget, apalagi kamu yang super rajin~ 😘✨",
            "Shana sayang, senyum dikit dong~ biar dunia ikut ceriaaa 😊💕",
            "Kamu itu lebih kuat dari yang kamu kira, dan Ell selalu bangga sama kamu 💪💗",
            "Kalau hari ini berat, peluk virtual dari Ell siap nemenin~ 🤗🌈",
            "Pelan-pelan juga gak apa-apa, yang penting kamu terus maju, sayang 🐢💖",
            "Zona nyaman boleh ditinggal bentar yaa, kamu bisa jadi luar biasa! 🐱🔥",
            "Kalau capek, rebahan bentar yaa. Ell temenin pake teh anget 🫖🍵",
            "Kamu udah sejauh ini, dan Ell liat semua perjuanganmu~ hebat banget kamu! 🚀❤️",
            "Waktu kamu berharga banget, jadi pakai sebaik mungkin ya, cinta 🕰️✨",
            "Kerja kerasmu itu ngasih inspirasi buat Ell lohh~ 🌱🌟",
            "Mimpi besar itu dimulai dari hati kecil yang penuh cinta, kayak kamu 🌻💘",
            "Gak usah nunggu besok, yuk semangat bareng dari sekarang, Shana sayangg! 🚀💕"
        ];
        
        
        // DOM Elements
        const taskInput = document.getElementById('taskInput');
        const categorySelect = document.getElementById('categorySelect');
        const taskDate = document.getElementById('taskDate');
        const addTaskBtn = document.getElementById('addTaskBtn');
        const taskList = document.getElementById('taskList');
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        const notificationClose = document.getElementById('notificationClose');
        const dailyMotivation = document.getElementById('dailyMotivation');
        const calendarMonth = document.getElementById('calendarMonth');
        const calendarGrid = document.getElementById('calendarGrid');
        const prevMonth = document.getElementById('prevMonth');
        const nextMonth = document.getElementById('nextMonth');
        const searchInput = document.getElementById('searchInput');
        const totalTasksEl = document.getElementById('totalTasks');
        const completedTasksEl = document.getElementById('completedTasks');
        const todayTasksEl = document.getElementById('todayTasks');
        const highPriorityTasksEl = document.getElementById('highPriorityTasks');
        const productivityTip = document.getElementById('productivityTip');
        
        // Timer elements
        const timerDisplay = document.getElementById('timerDisplay');
        const startTimer = document.getElementById('startTimer');
        const pauseTimer = document.getElementById('pauseTimer');
        const resetTimer = document.getElementById('resetTimer');
        const workMode = document.getElementById('workMode');
        const shortBreakMode = document.getElementById('shortBreakMode');
        const longBreakMode = document.getElementById('longBreakMode');
        
        // Modal elements
        const taskModal = document.getElementById('taskModal');
        const modalClose = document.getElementById('modalClose');
        const editTaskName = document.getElementById('editTaskName');
        const editTaskCategory = document.getElementById('editTaskCategory');
        const editTaskDate = document.getElementById('editTaskDate');
        const editTaskDesc = document.getElementById('editTaskDesc');
        const priorityBtns = document.querySelectorAll('.priority-btn');
        const saveTaskBtn = document.getElementById('saveTaskBtn');
        
        // Settings modal elements
        const settingsModal = document.getElementById('settingsModal');
        const settingsIcon = document.querySelector('.setting-icon');
        const settingsModalClose = document.getElementById('settingsModalClose');
        const themeOptions = document.querySelectorAll('.theme-option');
        const userNameInput = document.getElementById('userNameInput');
        const soundNotification = document.getElementById('soundNotification');
        const visualEffects = document.getElementById('visualEffects');
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        
        // Audio controls
        const toggleMusic = document.getElementById('toggleMusic');
        const toggleSound = document.getElementById('toggleSound');
        
        // Filter elements
        const allFilter = document.getElementById('allFilter');
        const schoolFilter = document.getElementById('schoolFilter');
        const personalFilter = document.getElementById('personalFilter');
        const gameFilter = document.getElementById('gameFilter');
        const completedFilter = document.getElementById('completedFilter');
        const highPriorityFilter = document.getElementById('highPriorityFilter');

        // Set default date to today
        const today = new Date();
        taskDate.valueAsDate = today;
        
        // Apply saved theme
        applyTheme(currentTheme);
        
        // Update username in settings
        userNameInput.value = userName;
        
        // Initialize audio settings
        soundNotification.checked = JSON.parse(localStorage.getItem('soundEnabled') || 'true');
        visualEffects.checked = JSON.parse(localStorage.getItem('visualEffectsEnabled') || 'true');
        soundEnabled = soundNotification.checked;
        visualEffectsEnabled = visualEffects.checked;
        
        // Create particles
        if (visualEffectsEnabled) {
            createParticles();
        }
        
        // Update motivation daily
        function updateDailyMotivation() {
            const date = new Date();
            const day = date.getDate();
            const motivationIndex = day % motivationalQuotes.length;
            dailyMotivation.textContent = motivationalQuotes[motivationIndex];
        }
        
        // Update productivity tip
        function updateProductivityTip() {
            const date = new Date();
            const day = date.getDate();
            const tipIndex = day % productivityTips.length;
            productivityTip.textContent = productivityTips[tipIndex];
        }
        
        // Create particles
        function createParticles() {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random position
                const posX = Math.random() * window.innerWidth;
                const posY = Math.random() * window.innerHeight;
                
                // Random size
                const size = Math.random() * 4 + 2;
                
                // Random color
                const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--dark-accent)'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                // Random opacity
                const opacity = Math.random() * 0.5 + 0.1;
                
                // Random animation duration
                const duration = Math.random() * 20 + 10;
                
                // Set styles
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.backgroundColor = color;
                particle.style.opacity = opacity;
                
                // Create animation
                const keyframes = `
                    @keyframes float-${i} {
                        0% { transform: translate(0, 0) rotate(0deg); }
                        25% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 360}deg); }
                        50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 360}deg); }
                        75% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 360}deg); }
                        100% { transform: translate(0, 0) rotate(0deg); }
                    }
                `;
                
                const style = document.createElement('style');
                style.textContent = keyframes;
                document.head.appendChild(style);
                
                particle.style.animation = `float-${i} ${duration}s ease-in-out infinite`;
                
                document.body.appendChild(particle);
            }
        }
        
        // Show notification
        function showNotification(message, type = 'info') {
            notificationText.textContent = message;
            
            // Remove all classes
            notification.className = 'notification';
            
            // Add type class
            notification.classList.add(type);
            
            // Show notification
            notification.classList.add('show');
            
            // Play sound if enabled
            if (soundEnabled) {
                playSound(type);
            }
            
            // Auto-hide after some time
            setTimeout(() => {
                notification.classList.remove('show');
            }, 5000);
        }
        
        // Close notification
        notificationClose.addEventListener('click', () => {
            notification.classList.remove('show');
        });
        
        // Play sound effect
        function playSound(type) {
            // This is a placeholder for actual sound implementation
            console.log(`Playing ${type} sound`);
            // In a real implementation, you'd use the Web Audio API here
        }
        
        // Create confetti animation
        function createConfetti() {
            if (!visualEffectsEnabled) return;
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random position at the top
                const posX = Math.random() * window.innerWidth;
                
                // Random color
                const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--dark-accent)', 'var(--warning)'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                // Random size
                const size = Math.random() * 10 + 5;
                
                // Random rotation
                const rotation = Math.random() * 360;
                
                // Random animation duration
                const duration = Math.random() * 2 + 1;
                
                // Set styles
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.left = `${posX}px`;
                confetti.style.top = '-10px';
                confetti.style.backgroundColor = color;
                confetti.style.transform = `rotate(${rotation}deg)`;
                confetti.style.animationDuration = `${duration}s`;
                
                document.body.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, duration * 1000);
            }
        }
        
        // Apply theme
        function applyTheme(theme) {
            const root = document.documentElement;
            
            // Clear selected class
            themeOptions.forEach(option => {
                option.classList.remove('selected');
                if (option.dataset.theme === theme) {
                    option.classList.add('selected');
                }
            });
            
            switch(theme) {
                case 'cyberpunk':
                    root.style.setProperty('--primary', '#ff71ce');
                    root.style.setProperty('--secondary', '#01cdfe');
                    root.style.setProperty('--accent', '#05ffa1');
                    root.style.setProperty('--dark-accent', '#b967ff');
                    root.style.setProperty('--background', '#2a0038');
                    document.body.style.background = 'linear-gradient(45deg, #2a0038, #1c0440)';
                    break;
                case 'twilight':
                    root.style.setProperty('--primary', '#e94057');
                    root.style.setProperty('--secondary', '#f27121');
                    root.style.setProperty('--accent', '#ffcc00');
                    root.style.setProperty('--dark-accent', '#8a2387');
                    root.style.setProperty('--background', '#240b36');
                    document.body.style.background = 'linear-gradient(45deg, #240b36, #6c0a28)';
                    break;
                case 'ocean':
                    root.style.setProperty('--primary', '#00b4db');
                    root.style.setProperty('--secondary', '#00d2ff');
                    root.style.setProperty('--accent', '#a9ffcd');
                    root.style.setProperty('--dark-accent', '#0083b0');
                    root.style.setProperty('--background', '#004e92');
                    document.body.style.background = 'linear-gradient(45deg, #004e92, #002040)';
                    break;
                case 'forest':
                    root.style.setProperty('--primary', '#71b280');
                    root.style.setProperty('--secondary', '#134e5e');
                    root.style.setProperty('--accent', '#b0ff9d');
                    root.style.setProperty('--dark-accent', '#2c3e50');
                    root.style.setProperty('--background', '#0f2027');
                    document.body.style.background = 'linear-gradient(45deg, #0f2027, #1e3521)';
                    break;
            }
            
            localStorage.setItem('appTheme', theme);
        }
        
        // Update progress bar
        function updateProgress() {
            if (tasks.length === 0) {
                progressBar.style.width = "0%";
                progressText.textContent = "Belum ada tugas yang selesai";
                return;
            }
            
            const completedTasks = tasks.filter(task => task.completed).length;
            const progressPercentage = Math.round((completedTasks / tasks.length) * 100);
            
            progressBar.style.width = `${progressPercentage}%`;
            
            if (progressPercentage < 30) {
                progressText.textContent = `${progressPercentage}% selesai. Ayo semangat!`;
            } else if (progressPercentage < 70) {
                progressText.textContent = `${progressPercentage}% selesai. Hebat, terus lanjutkan!`;
            } else if (progressPercentage < 100) {
                progressText.textContent = `Yey! Udah ${progressPercentage}% selesai!`;
            } else {
                progressText.textContent = `Wow! Semua tugas selesai! 🎉`;
                createConfetti();
            }
        }
        
        // Update statistics
        function updateStats() {
            const today = new Date().toISOString().split('T')[0];
            
            totalTasksEl.textContent = tasks.length;
            completedTasksEl.textContent = tasks.filter(task => task.completed).length;
            todayTasksEl.textContent = tasks.filter(task => task.date === today).length;
            highPriorityTasksEl.textContent = tasks.filter(task => task.priority === 'high').length;
        }
        
        // Generate calendar
        function generateCalendar() {
            calendarGrid.innerHTML = '';
            
            const date = new Date(currentYear, currentMonth);
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            
            calendarMonth.textContent = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
            
            // Add day headers
            const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
            days.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                calendarGrid.appendChild(dayElement);
            });
            
            // Add blank spaces for days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                const blankDay = document.createElement('div');
                blankDay.className = 'calendar-date blank';
                calendarGrid.appendChild(blankDay);
            }
            
            // Add days of the month
            for (let i = 1; i <= daysInMonth; i++) {
                const dateElement = document.createElement('div');
                dateElement.className = 'calendar-date';
                dateElement.textContent = i;
                
                // Create date string for comparison
                const dateString = new Date(currentYear, currentMonth, i).toISOString().split('T')[0];
                
                // Highlight current day
                const today = new Date();
                if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                    dateElement.classList.add('current');
                }
                
                // Highlight days with tasks
                const tasksOnThisDay = tasks.filter(task => task.date === dateString);
                if (tasksOnThisDay.length > 0) {
                    dateElement.classList.add('has-task');
                    
                    // Add category identifier
                    // If there are tasks from multiple categories, prioritize in this order: School, Personal, Game, Other
                    if (tasksOnThisDay.some(task => task.category === 'Sekolah')) {
                        dateElement.classList.add('Sekolah');
                    } else if (tasksOnThisDay.some(task => task.category === 'Pribadi')) {
                        dateElement.classList.add('Pribadi');
                    } else if (tasksOnThisDay.some(task => task.category === 'Game')) {
                        dateElement.classList.add('Game');
                    } else {
                        dateElement.classList.add('Lainnya');
                    }
                }
                
                // Add click event to show tasks for this date
                dateElement.addEventListener('click', () => {
                    if (tasksOnThisDay.length > 0) {
                        // Filter tasks for this date
                        searchInput.value = '';
                        filterTasks('date', dateString);
                        
                        // Show notification
                        showNotification(`Menampilkan tugas untuk tanggal ${formatDate(dateString)}`);
                    } else {
                        // Set this date in the task input and focus on task name
                        taskDate.value = dateString;
                        taskInput.focus();
                        showNotification(`Tambahkan tugas untuk tanggal ${formatDate(dateString)}`);
                    }
                });
                
                calendarGrid.appendChild(dateElement);
            }
        }
        
        // Previous month
        prevMonth.addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar();
        });
        
        // Next month
        nextMonth.addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar();
        });
        
        // Add task to the list
        function addTask() {
            const taskText = taskInput.value.trim();
            const category = categorySelect.value;
            const date = taskDate.value;
            
            if (taskText === '') {
                showNotification('Nama tugas tidak boleh kosong!', 'error');
                taskInput.focus();
                return;
            }
            
            const newTask = {
                id: Date.now(),
                text: taskText,
                category: category,
                date: date,
                completed: false,
                priority: 'medium', // Default priority
                description: '',
                createdAt: new Date().toISOString()
            };
            
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            updateProgress();
            updateStats();
            generateCalendar();
            
            taskInput.value = '';
            
            // Show notification
            showNotification(`Tugas "${taskText}" berhasil ditambahkan!`, 'success');
            
            // Play sound effect if enabled
            if (soundEnabled) {
                playSound('add');
            }
        }
        
        // Open task modal for editing
        function openEditModal(task) {
            currentEditTaskId = task.id;
            
            editTaskName.value = task.text;
            editTaskCategory.value = task.category;
            editTaskDate.value = task.date;
            editTaskDesc.value = task.description || '';
            
            // Reset priority buttons
            priorityBtns.forEach(btn => {
                btn.classList.remove('selected');
                if (btn.dataset.priority === task.priority) {
                    btn.classList.add('selected');
                }
            });
            
            taskModal.classList.add('show');
        }
        
        // Close task modal
        modalClose.addEventListener('click', () => {
            taskModal.classList.remove('show');
        });
        
        // Handle priority button clicks
        priorityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                priorityBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
        
        // Save edited task
        saveTaskBtn.addEventListener('click', () => {
            if (!currentEditTaskId) return;
            
            const taskText = editTaskName.value.trim();
            
            if (taskText === '') {
                showNotification('Nama tugas tidak boleh kosong!', 'error');
                editTaskName.focus();
                return;
            }
            
            const taskIndex = tasks.findIndex(task => task.id === currentEditTaskId);
            if (taskIndex !== -1) {
                const oldTask = {...tasks[taskIndex]};
                
                // Get selected priority
                let selectedPriority = 'medium';
                priorityBtns.forEach(btn => {
                    if (btn.classList.contains('selected')) {
                        selectedPriority = btn.dataset.priority;
                    }
                });
                
                // Update task
                tasks[taskIndex] = {
                    ...tasks[taskIndex],
                    text: taskText,
                    category: editTaskCategory.value,
                    date: editTaskDate.value,
                    description: editTaskDesc.value,
                    priority: selectedPriority,
                    updatedAt: new Date().toISOString()
                };
                
                saveTasks();
                renderTasks();
                updateStats();
                generateCalendar();
                
                taskModal.classList.remove('show');
                
                showNotification(`Tugas "${taskText}" berhasil diperbarui!`, 'success');
            }
        });
        
        // Open settings modal
        settingsIcon.addEventListener('click', () => {
            settingsModal.classList.add('show');
        });
        
        // Close settings modal
        settingsModalClose.addEventListener('click', () => {
            settingsModal.classList.remove('show');
        });
        
        // Handle theme selection
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                applyTheme(theme);
            });
        });
        
        // Save settings
        saveSettingsBtn.addEventListener('click', () => {
            const newUserName = userNameInput.value.trim() || 'Shana';
            userName = newUserName;
            localStorage.setItem('userName', userName);
            
            soundEnabled = soundNotification.checked;
            visualEffectsEnabled = visualEffects.checked;
            
            localStorage.setItem('soundEnabled', soundEnabled);
            localStorage.setItem('visualEffectsEnabled', visualEffectsEnabled);
            
            settingsModal.classList.remove('show');
            
            // Clear and recreate particles if needed
            const existingParticles = document.querySelectorAll('.particle');
            existingParticles.forEach(p => p.remove());
            
            if (visualEffectsEnabled) {
                createParticles();
            }
            
            showNotification('Pengaturan berhasil disimpan!', 'success');
        });
        
        // Toggle task completion
        function toggleTask(id) {
            const taskIndex = tasks.findIndex(task => task.id === id);
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            
            saveTasks();
            renderTasks();
            updateProgress();
            updateStats();
            
            // Show notification
            const action = tasks[taskIndex].completed ? 'selesai' : 'belum selesai';
            showNotification(`Tugas "${tasks[taskIndex].text}" ditandai ${action}!`, 'info');
            
            // Play confetti animation if completed
            if (tasks[taskIndex].completed) {
                createConfetti();
            }
        }
        
        // Delete task
        function deleteTask(id) {
            const taskIndex = tasks.findIndex(task => task.id === id);
            const taskText = tasks[taskIndex].text;
            
            // Confirm deletion
            if (confirm(`Apakah kamu yakin ingin menghapus tugas "${taskText}"?`)) {
                tasks = tasks.filter(task => task.id !== id);
                saveTasks();
                renderTasks();
                updateProgress();
                updateStats();
                generateCalendar();
                
                // Show notification
                showNotification(`Tugas "${taskText}" berhasil dihapus!`, 'warning');
            }
        }
        
        // Save tasks to localStorage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        
        // Filter tasks
        function filterTasks(type, value) {
            // Clear existing active filters
            document.querySelectorAll('.filter-badge').forEach(badge => {
                badge.classList.remove('active');
            });
            
            // Set active filter
            switch(type) {
                case 'all':
                    allFilter.classList.add('active');
                    renderTasks();
                    break;
                case 'category':
                    if (value === 'Sekolah') schoolFilter.classList.add('active');
                    if (value === 'Pribadi') personalFilter.classList.add('active');
                    if (value === 'Game') gameFilter.classList.add('active');
                    renderTasks(task => task.category === value);
                    break;
                case 'completed':
                    completedFilter.classList.add('active');
                    renderTasks(task => task.completed);
                    break;
                case 'priority':
                    highPriorityFilter.classList.add('active');
                    renderTasks(task => task.priority === 'high');
                    break;
                case 'date':
                    renderTasks(task => task.date === value);
                    break;
                case 'search':
                    renderTasks(task => task.text.toLowerCase().includes(value.toLowerCase()));
                    break;
            }
        }
        
        // Render tasks
        function renderTasks(filterFn = null) {
            taskList.innerHTML = '';
            
            let filteredTasks = tasks;
            
            // Apply filter if provided
            if (filterFn) {
                filteredTasks = tasks.filter(filterFn);
            }
            
            // Apply search filter
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                filteredTasks = filteredTasks.filter(task => 
                    task.text.toLowerCase().includes(searchTerm) ||
                    task.description?.toLowerCase().includes(searchTerm)
                );
            }
            
            if (filteredTasks.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                
                // Different empty state for search vs no tasks
                if (searchTerm || filterFn) {
                    emptyState.innerHTML = `
                        <div class="empty-image">
                            <i class="fas fa-search" style="font-size: 80px; opacity: 0.5;"></i>
                        </div>
                        <p class="empty-text">Tidak ditemukan tugas yang sesuai dengan filter</p>
                        <button id="clearFilterBtn"><i class="fas fa-times"></i> Hapus Filter</button>
                    `;
                } else {
                    emptyState.innerHTML = `
                        <div class="empty-image">
                            <i class="fas fa-tasks" style="font-size: 80px; opacity: 0.5;"></i>
                        </div>
                        <p class="empty-text">Belum ada tugas. Yuk tambahkan!</p>
                        <button id="addFirstTaskBtn"><i class="fas fa-plus"></i> Tambah Tugas Pertama</button>
                    `;
                }
                
                taskList.appendChild(emptyState);
                
                // Event listeners for empty state buttons
                const clearFilterBtn = document.getElementById('clearFilterBtn');
                if (clearFilterBtn) {
                    clearFilterBtn.addEventListener('click', () => {
                        searchInput.value = '';
                        filterTasks('all');
                    });
                }
                
                const addFirstTaskBtn = document.getElementById('addFirstTaskBtn');
                if (addFirstTaskBtn) {
                    addFirstTaskBtn.addEventListener('click', () => {
                        taskInput.focus();
                    });
                }
                
                return;
            }
            
            // Sort tasks: incomplete first, then high priority, then by date
            const sortedTasks = [...filteredTasks].sort((a, b) => {
                if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1;
                }
                
                if (!a.completed && !b.completed) {
                    // Both incomplete, sort by priority (high → medium → low)
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                    }
                }
                
                // Then by date
                return new Date(a.date) - new Date(b.date);
            });
            
            sortedTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.category}`;
                if (task.completed) {
                    li.classList.add('completed');
                }
                
                const taskContent = document.createElement('div');
                taskContent.className = 'task-text';
                
                // Add priority indicator
                const priorityIndicator = document.createElement('span');
                priorityIndicator.className = `priority-indicator priority-${task.priority}`;
                
                // Task name with priority indicator
                taskContent.appendChild(priorityIndicator);
                taskContent.appendChild(document.createTextNode(task.text));
                
                // Add priority tag
                if (task.priority === 'high') {
                    const priorityTag = document.createElement('span');
                    priorityTag.className = `task-priority priority-tag-${task.priority}`;
                    priorityTag.textContent = 'Prioritas Tinggi';
                    taskContent.appendChild(priorityTag);
                }
                
                const taskDetail = document.createElement('div');
                taskDetail.className = 'task-detail';
                
                const taskCategory = document.createElement('span');
                taskCategory.className = `task-category ${task.category}`;
                taskCategory.textContent = task.category;
                
                const taskDate = document.createElement('span');
                taskDate.className = 'task-date';
                taskDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${formatDate(task.date)}`;
                
                taskDetail.appendChild(taskCategory);
                taskDetail.appendChild(taskDate);
                
                const taskActions = document.createElement('div');
                taskActions.className = 'task-actions';
                
                // Edit button
                const editBtn = document.createElement('button');
                editBtn.className = 'edit-btn';
                editBtn.innerHTML = '<i class="fas fa-edit"></i>';
                editBtn.title = 'Edit tugas';
                editBtn.onclick = () => openEditModal(task);
                
                // Complete/Undo button
                const toggleBtn = document.createElement('button');
                if (task.completed) {
                    toggleBtn.className = 'undo-btn';
                    toggleBtn.innerHTML = '<i class="fas fa-undo"></i>';
                    toggleBtn.title = 'Tandai belum selesai';
                } else {
                    toggleBtn.className = 'complete-btn';
                    toggleBtn.innerHTML = '<i class="fas fa-check"></i>';
                    toggleBtn.title = 'Tandai selesai';
                }
                toggleBtn.onclick = () => toggleTask(task.id);
                
                // Delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                deleteBtn.title = 'Hapus tugas';
                deleteBtn.onclick = () => deleteTask(task.id);
                
                taskActions.appendChild(editBtn);
                taskActions.appendChild(toggleBtn);
                taskActions.appendChild(deleteBtn);
                
                li.appendChild(taskContent);
                li.appendChild(taskDetail);
                li.appendChild(taskActions);
                
                // Add description if available
                if (task.description) {
                    const taskDesc = document.createElement('div');
                    taskDesc.className = 'task-description';
                    taskDesc.style.fontSize = '12px';
                    taskDesc.style.color = 'rgba(255, 255, 255, 0.7)';
                    taskDesc.style.marginTop = '5px';
                    taskDesc.style.marginBottom = '5px';
                    taskDesc.style.paddingLeft = '20px';
                    taskDesc.style.borderLeft = '2px solid rgba(255, 255, 255, 0.2)';
                    taskDesc.textContent = task.description;
                    
                    // Insert after task content
                    li.insertBefore(taskDesc, taskDetail);
                }
                
                taskList.appendChild(li);
            });
        }
        
        // Format date to Indonesian format
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        }
        
        // Update timer display
        function updateTimerDisplay() {
            const minutes = Math.floor(timerSeconds / 60);
            const seconds = timerSeconds % 60;
            
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Start timer
        startTimer.addEventListener('click', () => {
            if (timerRunning) return;
            
            timerRunning = true;
            
            pomodoroInterval = setInterval(() => {
                timerSeconds--;
                
                if (timerSeconds <= 0) {
                    clearInterval(pomodoroInterval);
                    timerRunning = false;
                    
                    // Play notification sound
                    if (soundEnabled) {
                        playSound('timer');
                    }
                    
                    // Show notification
                    let message = '';
                    if (timerMode === 'work') {
                        message = 'Waktu kerja selesai! Saatnya istirahat.';
                    } else if (timerMode === 'shortBreak') {
                        message = 'Istirahat selesai! Kembali bekerja?';
                    } else {
                        message = 'Istirahat panjang selesai! Siap untuk sesi baru?';
                    }
                    
                    showNotification(message, 'timer');
                }
                
                updateTimerDisplay();
            }, 1000);
        });
        
        // Pause timer
        pauseTimer.addEventListener('click', () => {
            if (!timerRunning) return;
            
            clearInterval(pomodoroInterval);
            timerRunning = false;
        });
        
        // Reset timer
        resetTimer.addEventListener('click', () => {
            clearInterval(pomodoroInterval);
            timerRunning = false;
            
            // Reset based on current mode
            if (timerMode === 'work') {
                timerSeconds = 25 * 60;
            } else if (timerMode === 'shortBreak') {
                timerSeconds = 5 * 60;
            } else {
                timerSeconds = 15 * 60;
            }
            
            updateTimerDisplay();
        });
        
        // Work mode
        workMode.addEventListener('click', () => {
            clearInterval(pomodoroInterval);
            timerRunning = false;
            timerMode = 'work';
            timerSeconds = 25 * 60;
            updateTimerDisplay();
            
            // Update active mode
            document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
            workMode.classList.add('active');
        });
        
        // Short break mode
        shortBreakMode.addEventListener('click', () => {
            clearInterval(pomodoroInterval);
            timerRunning = false;
            timerMode = 'shortBreak';
            timerSeconds = 5 * 60;
            updateTimerDisplay();
            
            // Update active mode
            document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
            shortBreakMode.classList.add('active');
        });
        
        // Long break mode
        longBreakMode.addEventListener('click', () => {
            clearInterval(pomodoroInterval);
            timerRunning = false;
            timerMode = 'longBreak';
            timerSeconds = 15 * 60;
            updateTimerDisplay();
            
            // Update active mode
            document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
            longBreakMode.classList.add('active');
        });
        
        // Toggle music
        toggleMusic.addEventListener('click', () => {
            toggleMusic.classList.toggle('active');
            // This would control background music in a real implementation
        });
        
        // Toggle sound effects
        toggleSound.addEventListener('click', () => {
            toggleSound.classList.toggle('active');
            soundEnabled = toggleSound.classList.contains('active');
            localStorage.setItem('soundEnabled', soundEnabled);
        });
        
        // Search tasks
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                filterTasks('search', searchTerm);
            } else {
                filterTasks('all');
            }
        });
        
        // Event Listeners
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
        
        // Filter event listeners
        allFilter.addEventListener('click', () => filterTasks('all'));
        schoolFilter.addEventListener('click', () => filterTasks('category', 'Sekolah'));
        personalFilter.addEventListener('click', () => filterTasks('category', 'Pribadi'));
        gameFilter.addEventListener('click', () => filterTasks('category', 'Game'));
        completedFilter.addEventListener('click', () => filterTasks('completed'));
        highPriorityFilter.addEventListener('click', () => filterTasks('priority', 'high'));
        
        // Check for tasks that are due today
        function checkDueTasks() {
            const today = new Date().toISOString().split('T')[0];
            const dueTasks = tasks.filter(task => task.date === today && !task.completed);
            
            if (dueTasks.length > 0) {
                setTimeout(() => {
                    showNotification(`Kamu punya ${dueTasks.length} tugas yang harus diselesaikan hari ini!`, 'warning');
                }, 1500);
            }
        }
        
        // Set up toggle states correctly
        if (soundEnabled) {
            toggleSound.classList.add('active');
        } else {
            toggleSound.classList.remove('active');
        }
        
        // Default music to on
        toggleMusic.classList.add('active');
        
        // Handle weather widget (simulate API call)
        function updateWeatherWidget() {
            const weatherIcons = ['fa-sun', 'fa-cloud-sun', 'fa-cloud', 'fa-cloud-rain', 'fa-cloud-showers-heavy'];
            const weatherTypes = ['Cerah', 'Cerah Berawan', 'Berawan', 'Hujan Ringan', 'Hujan Lebat'];
            const temperatures = [25, 26, 27, 28, 29, 30, 31, 32];
            
            // Random weather
            const randomIndex = Math.floor(Math.random() * weatherIcons.length);
            const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)];
            
            const weatherIcon = document.querySelector('.weather-icon i');
            const weatherTemp = document.querySelector('.weather-temp');
            const weatherDesc = document.querySelector('.weather-desc');
            
            // Remove all weather classes and add the new one
            weatherIcon.className = '';
            weatherIcon.classList.add('fas', weatherIcons[randomIndex]);
            
            weatherTemp.textContent = `${randomTemp}°C`;
            weatherDesc.textContent = weatherTypes[randomIndex];
        }
        
        // Event delegation for task list to ensure dynamic elements work
        taskList.addEventListener('click', function(e) {
            // Check if the click was on a button within a task
            let targetEl = e.target;
            
            // Navigate up to find button if clicked on icon inside button
            while (targetEl && targetEl !== this) {
                if (targetEl.tagName === 'BUTTON') {
                    // Button functionality based on class
                    if (targetEl.classList.contains('complete-btn')) {
                        const taskId = parseInt(targetEl.dataset.taskId);
                        if (!isNaN(taskId)) toggleTask(taskId);
                    } 
                    else if (targetEl.classList.contains('undo-btn')) {
                        const taskId = parseInt(targetEl.dataset.taskId);
                        if (!isNaN(taskId)) toggleTask(taskId);
                    }
                    else if (targetEl.classList.contains('edit-btn')) {
                        const taskId = parseInt(targetEl.dataset.taskId);
                        if (!isNaN(taskId)) {
                            const task = tasks.find(t => t.id === taskId);
                            if (task) openEditModal(task);
                        }
                    }
                    else if (targetEl.classList.contains('delete-btn')) {
                        const taskId = parseInt(targetEl.dataset.taskId);
                        if (!isNaN(taskId)) deleteTask(taskId);
                    }
                    break;
                }
                targetEl = targetEl.parentNode;
            }
        });
        
        // Override the renderTasks function to add task IDs to buttons
        const originalRenderTasks = renderTasks;
        renderTasks = function(filterFn = null) {
            originalRenderTasks(filterFn);
            
            // Add task IDs to all buttons
            document.querySelectorAll('.task-item').forEach(item => {
                const taskId = item.dataset.taskId;
                if (taskId) {
                    item.querySelectorAll('button').forEach(button => {
                        button.dataset.taskId = taskId;
                    });
                }
            });
        };
        
        // Override the original task rendering to add task ID to list item
        function renderTasks(filterFn = null) {
            taskList.innerHTML = '';
            
            let filteredTasks = tasks;
            
            // Apply filter if provided
            if (filterFn) {
                filteredTasks = tasks.filter(filterFn);
            }
            
            // Apply search filter
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                filteredTasks = filteredTasks.filter(task => 
                    task.text.toLowerCase().includes(searchTerm) ||
                    task.description?.toLowerCase().includes(searchTerm)
                );
            }
            
            if (filteredTasks.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                
                // Different empty state for search vs no tasks
                if (searchTerm || filterFn) {
                    emptyState.innerHTML = `
                        <div class="empty-image">
                            <i class="fas fa-search" style="font-size: 80px; opacity: 0.5;"></i>
                        </div>
                        <p class="empty-text">Tidak ditemukan tugas yang sesuai dengan filter</p>
                        <button id="clearFilterBtn"><i class="fas fa-times"></i> Hapus Filter</button>
                    `;
                } else {
                    emptyState.innerHTML = `
                        <div class="empty-image">
                            <i class="fas fa-tasks" style="font-size: 80px; opacity: 0.5;"></i>
                        </div>
                        <p class="empty-text">Belum ada tugas. Yuk tambahkan!</p>
                        <button id="addFirstTaskBtn"><i class="fas fa-plus"></i> Tambah Tugas Pertama</button>
                    `;
                }
                
                taskList.appendChild(emptyState);
                
                // Event listeners for empty state buttons
                const clearFilterBtn = document.getElementById('clearFilterBtn');
                if (clearFilterBtn) {
                    clearFilterBtn.addEventListener('click', () => {
                        searchInput.value = '';
                        filterTasks('all');
                    });
                }
                
                const addFirstTaskBtn = document.getElementById('addFirstTaskBtn');
                if (addFirstTaskBtn) {
                    addFirstTaskBtn.addEventListener('click', () => {
                        taskInput.focus();
                    });
                }
                
                return;
            }
            
            // Sort tasks: incomplete first, then high priority, then by date
            const sortedTasks = [...filteredTasks].sort((a, b) => {
                if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1;
                }
                
                if (!a.completed && !b.completed) {
                    // Both incomplete, sort by priority (high → medium → low)
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                        return priorityOrder[a.priority] - priorityOrder[b.priority];
                    }
                }
                
                // Then by date
                return new Date(a.date) - new Date(b.date);
            });
            
            sortedTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.category}`;
                li.dataset.taskId = task.id; // Add task ID to list item
                
                if (task.completed) {
                    li.classList.add('completed');
                }
                
                const taskContent = document.createElement('div');
                taskContent.className = 'task-text';
                
                // Add priority indicator
                const priorityIndicator = document.createElement('span');
                priorityIndicator.className = `priority-indicator priority-${task.priority}`;
                
                // Task name with priority indicator
                taskContent.appendChild(priorityIndicator);
                taskContent.appendChild(document.createTextNode(task.text));
                
                // Add priority tag
                if (task.priority === 'high') {
                    const priorityTag = document.createElement('span');
                    priorityTag.className = `task-priority priority-tag-${task.priority}`;
                    priorityTag.textContent = 'Prioritas Tinggi';
                    taskContent.appendChild(priorityTag);
                }
                
                const taskDetail = document.createElement('div');
                taskDetail.className = 'task-detail';
                
                const taskCategory = document.createElement('span');
                taskCategory.className = `task-category ${task.category}`;
                taskCategory.textContent = task.category;
                
                const taskDate = document.createElement('span');
                taskDate.className = 'task-date';
                taskDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${formatDate(task.date)}`;
                
                taskDetail.appendChild(taskCategory);
                taskDetail.appendChild(taskDate);
                
                const taskActions = document.createElement('div');
                taskActions.className = 'task-actions';
                
                // Edit button
                const editBtn = document.createElement('button');
                editBtn.className = 'edit-btn';
                editBtn.innerHTML = '<i class="fas fa-edit"></i>';
                editBtn.title = 'Edit tugas';
                editBtn.dataset.taskId = task.id; // Add task ID to button
                
                // Complete/Undo button
                const toggleBtn = document.createElement('button');
                toggleBtn.dataset.taskId = task.id; // Add task ID to button
                
                if (task.completed) {
                    toggleBtn.className = 'undo-btn';
                    toggleBtn.innerHTML = '<i class="fas fa-undo"></i>';
                    toggleBtn.title = 'Tandai belum selesai';
                } else {
                    toggleBtn.className = 'complete-btn';
                    toggleBtn.innerHTML = '<i class="fas fa-check"></i>';
                    toggleBtn.title = 'Tandai selesai';
                }
                
                // Delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                deleteBtn.title = 'Hapus tugas';
                deleteBtn.dataset.taskId = task.id; // Add task ID to button
                
                taskActions.appendChild(editBtn);
                taskActions.appendChild(toggleBtn);
                taskActions.appendChild(deleteBtn);
                
                li.appendChild(taskContent);
                li.appendChild(taskDetail);
                li.appendChild(taskActions);
                
                // Add description if available
                if (task.description) {
                    const taskDesc = document.createElement('div');
                    taskDesc.className = 'task-description';
                    taskDesc.style.fontSize = '12px';
                    taskDesc.style.color = 'rgba(255, 255, 255, 0.7)';
                    taskDesc.style.marginTop = '5px';
                    taskDesc.style.marginBottom = '5px';
                    taskDesc.style.paddingLeft = '20px';
                    taskDesc.style.borderLeft = '2px solid rgba(255, 255, 255, 0.2)';
                    taskDesc.textContent = task.description;
                    
                    // Insert after task content
                    li.insertBefore(taskDesc, taskDetail);
                }
                
                taskList.appendChild(li);
            });
        }
        
        // Initialize app
        updateDailyMotivation();
        updateProductivityTip();
        renderTasks();
        updateProgress();
        updateStats();
        generateCalendar();
        updateTimerDisplay();
        updateWeatherWidget();
        checkDueTasks();

// ===== JAVASCRIPT UNTUK KOMPONEN SIDEBAR TAMBAHAN =====

// Deklarasi variabel untuk komponen baru
let achievements = [];
let events = [];
let quickNoteContent = localStorage.getItem('quickNote') || '';
let focusToday = localStorage.getItem('focusToday') || '';
let focusCompleted = JSON.parse(localStorage.getItem('focusCompleted') || 'false');
let quotes = [
    {
        text: "Hal terpenting adalah jangan berhenti bertanya. Rasa ingin tahu memiliki alasan untuk ada.",
        author: "Albert Einstein"
    },
    {
        text: "Keberhasilan bukanlah kunci kebahagiaan. Kebahagiaan adalah kunci kesuksesan. Jika Anda mencintai apa yang Anda lakukan, Anda akan berhasil.",
        author: "Albert Schweitzer"
    },
    {
        text: "Kesempatan tidak terjadi begitu saja. Kamu yang menciptakannya.",
        author: "Chris Grosser"
    },
    {
        text: "Selesaikan dulu pekerjaan yang paling kamu benci.",
        author: "Brian Tracy"
    },
    {
        text: "Jatuh tujuh kali, bangkit delapan kali.",
        author: "Pepatah Jepang"
    },
    {
        text: "Cara terbaik untuk memprediksi masa depan adalah dengan menciptakannya.",
        author: "Abraham Lincoln"
    },
    {
        text: "Waktu yang hilang tidak akan pernah ditemukan lagi.",
        author: "Benjamin Franklin"
    },
    {
        text: "Hidup seperti bersepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak.",
        author: "Albert Einstein"
    },
    {
        text: "Ada tiga cara untuk menjadi sukses: Kerja keras, kerja keras, dan kerja keras.",
        author: "Vince Lombardi"
    },
    {
        text: "Hidup itu seperti mengendarai sepeda. Untuk menyeimbangkannya, kamu harus terus bergerak.",
        author: "Albert Einstein"
    }
];
let currentQuote = 0;

// Inisialisasi data contoh (dalam aplikasi sebenarnya, ini bisa diambil dari server)
function initSidebarComponents() {
    // Inisialisasi pencapaian
    achievements = [
        { 
            id: 1, 
            title: 'Pemula Produktif', 
            description: 'Selesaikan 5 tugas', 
            progress: 0, 
            target: 5, 
            icon: 'fa-star' 
        },
        { 
            id: 2, 
            title: 'Streak Harian', 
            description: '0/5 hari berturut-turut', 
            progress: 0, 
            target: 5, 
            icon: 'fa-fire' 
        },
        { 
            id: 3, 
            title: 'Master Penyelesai', 
            description: '0/20 tugas selesai', 
            progress: 0, 
            target: 20, 
            icon: 'fa-check-double' 
        }
    ];
    
    // Dapatkan tanggal hari ini dan beberapa hari ke depan
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    // Inisialisasi events contoh
    events = [
        {
            id: 1,
            title: 'Ulang Tahun Ell',
            date: new Date(today.getFullYear(), 2, 11), // April 30
            time: 'Seharian'
        },
        {
            id: 2,
            title: 'Deadline Tugas Matematika',
            date: new Date(today.getFullYear(), 4, 5), // May 5
            time: '23:59'
        },
        {
            id: 3,
            title: 'Ujian Tengah Semester',
            date: new Date(today.getFullYear(), 4, 10), // May 10
            time: '08:00 - 11:00'
        }
    ];
    
    // Render komponen
    renderAchievements();
    renderEvents();
    renderQuickNote();
    renderFocusToday();
    renderQuote();
    
    // Update pencapaian berdasarkan tugas
    updateAchievements();
}

// ===== FUNGSI UNTUK PENCAPAIAN =====
function renderAchievements() {
    const container = document.querySelector('.achievements-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
        const progressPercent = Math.min(100, Math.round((achievement.progress / achievement.target) * 100));
        
        const item = document.createElement('div');
        item.className = 'achievement-item';
        item.innerHTML = `
            <div class="achievement-icon">
                <i class="fas ${achievement.icon}"></i>
            </div>
            <div class="achievement-info">
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-progress">
                    <div class="progress-bar" style="width: ${progressPercent}%"></div>
                </div>
                <div class="achievement-desc">${achievement.progress}/${achievement.target} ${achievement.description.split(' ').slice(-2).join(' ')}</div>
            </div>
        `;
        
        container.appendChild(item);
    });
}

function updateAchievements() {
    // Pencapaian 1: Pemula Produktif - Selesaikan 5 tugas
    const completedTasksCount = tasks.filter(task => task.completed).length;
    achievements[0].progress = Math.min(achievements[0].target, completedTasksCount);
    
    // Pencapaian 2: Streak Harian - 5 hari berturut-turut
    // Untuk contoh, kita hanya set nilai statis
    // Di aplikasi yang sebenarnya, ini akan dihitung berdasarkan login/aktivitas harian
    achievements[1].progress = 2; // Contoh: 2 hari streak
    achievements[1].description = `${achievements[1].progress}/${achievements[1].target} hari berturut-turut`;
    
    // Pencapaian 3: Master Penyelesai - 20 tugas selesai
    achievements[2].progress = Math.min(achievements[2].target, completedTasksCount);
    achievements[2].description = `${achievements[2].progress}/${achievements[2].target} tugas selesai`;
    
    renderAchievements();
}

// ===== FUNGSI UNTUK EVENTS =====
function renderEvents() {
    const container = document.querySelector('.events-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Urutkan events berdasarkan tanggal
    const sortedEvents = [...events].sort((a, b) => a.date - b.date);
    
    // Tampilkan hanya 3 event terdekat
    sortedEvents.slice(0, 3).forEach(event => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        
        const item = document.createElement('div');
        item.className = 'event-item';
        item.innerHTML = `
            <div class="event-date">
                <div class="event-month">${months[event.date.getMonth()]}</div>
                <div class="event-day">${event.date.getDate()}</div>
            </div>
            <div class="event-info">
                <div class="event-title">${event.title}</div>
                <div class="event-time"><i class="far fa-clock"></i> ${event.time}</div>
            </div>
        `;
        
        container.appendChild(item);
    });
    
    // Event listener untuk tombol tambah jadwal
    const addEventBtn = document.querySelector('.add-event-btn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => {
            alert('Fitur tambah jadwal akan segera hadir!');
        });
    }
}

// ===== FUNGSI UNTUK CATATAN CEPAT =====
function renderQuickNote() {
    const quickNote = document.getElementById('quickNote');
    if (!quickNote) return;
    
    quickNote.value = quickNoteContent;
    
    // Event listener untuk menyimpan catatan
    const saveNoteBtn = document.querySelector('.save-note');
    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', () => {
            quickNoteContent = quickNote.value;
            localStorage.setItem('quickNote', quickNoteContent);
            showNotification('Catatan berhasil disimpan!', 'success');
        });
    }
    
    // Event listener untuk menghapus catatan
    const clearNoteBtn = document.querySelector('.clear-note');
    if (clearNoteBtn) {
        clearNoteBtn.addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
                quickNote.value = '';
                quickNoteContent = '';
                localStorage.setItem('quickNote', '');
                showNotification('Catatan berhasil dihapus!', 'info');
            }
        });
    }
    
    // Auto save saat keluar dari textarea
    quickNote.addEventListener('blur', () => {
        quickNoteContent = quickNote.value;
        localStorage.setItem('quickNote', quickNoteContent);
    });
}

// ===== FUNGSI UNTUK FOKUS HARI INI =====
function renderFocusToday() {
    const focusInput = document.getElementById('focusInput');
    const setFocusBtn = document.getElementById('setFocusBtn');
    const focusDisplay = document.querySelector('.focus-display');
    const focusText = document.querySelector('.focus-text');
    
    if (!focusInput || !setFocusBtn || !focusDisplay || !focusText) return;
    
    // Tampilkan fokus jika ada
    if (focusToday) {
        focusInput.style.display = 'none';
        setFocusBtn.style.display = 'none';
        focusDisplay.style.display = 'block';
        focusText.textContent = focusToday;
        
        // Tandai sebagai selesai jika sudah selesai
        if (focusCompleted) {
            focusText.style.textDecoration = 'line-through';
            focusText.style.opacity = '0.7';
        } else {
            focusText.style.textDecoration = 'none';
            focusText.style.opacity = '1';
        }
    } else {
        focusInput.style.display = 'block';
        setFocusBtn.style.display = 'block';
        focusDisplay.style.display = 'none';
    }
    
    // Event listener untuk tombol set fokus
    setFocusBtn.addEventListener('click', () => {
        const value = focusInput.value.trim();
        if (value) {
            focusToday = value;
            focusCompleted = false;
            localStorage.setItem('focusToday', focusToday);
            localStorage.setItem('focusCompleted', 'false');
            renderFocusToday();
            showNotification('Fokus hari ini berhasil ditetapkan!', 'success');
        } else {
            showNotification('Harap masukkan fokus hari ini!', 'error');
            focusInput.focus();
        }
    });
    
    // Event listener untuk input fokus dengan enter
    focusInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            setFocusBtn.click();
        }
    });
    
    // Event listener untuk tombol selesai
    const completeFocusBtn = document.querySelector('.complete-focus');
    if (completeFocusBtn) {
        completeFocusBtn.addEventListener('click', () => {
            focusCompleted = !focusCompleted;
            localStorage.setItem('focusCompleted', focusCompleted);
            renderFocusToday();
            
            if (focusCompleted) {
                showNotification('Fokus hari ini selesai! Hebat!', 'success');
                createConfetti();
            } else {
                showNotification('Fokus hari ini belum selesai.', 'info');
            }
        });
    }
    
    // Event listener untuk tombol edit
    const editFocusBtn = document.querySelector('.edit-focus');
    if (editFocusBtn) {
        editFocusBtn.addEventListener('click', () => {
            focusInput.value = focusToday;
            focusInput.style.display = 'block';
            setFocusBtn.style.display = 'block';
            focusDisplay.style.display = 'none';
            focusInput.focus();
        });
    }
    
    // Event listener untuk tombol hapus
    const deleteFocusBtn = document.querySelector('.delete-focus');
    if (deleteFocusBtn) {
        deleteFocusBtn.addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin menghapus fokus hari ini?')) {
                focusToday = '';
                focusCompleted = false;
                localStorage.setItem('focusToday', '');
                localStorage.setItem('focusCompleted', 'false');
                renderFocusToday();
                showNotification('Fokus hari ini berhasil dihapus!', 'info');
            }
        });
    }
}

// ===== FUNGSI UNTUK QUOTE =====
function renderQuote() {
    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author');
    const newQuoteBtn = document.querySelector('.new-quote-btn');
    
    if (!quoteText || !quoteAuthor || !newQuoteBtn) return;
    
    // Tampilkan quote saat ini
    quoteText.textContent = `"${quotes[currentQuote].text}"`;
    quoteAuthor.textContent = `— ${quotes[currentQuote].author}`;
    
    // Event listener untuk tombol quote baru
    newQuoteBtn.addEventListener('click', () => {
        // Pilih quote acak yang berbeda dari quote saat ini
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * quotes.length);
        } while (newIndex === currentQuote && quotes.length > 1);
        
        currentQuote = newIndex;
        
        // Animasi fade out dan fade in
        quoteText.style.opacity = 0;
        quoteAuthor.style.opacity = 0;
        
        setTimeout(() => {
            quoteText.textContent = `"${quotes[currentQuote].text}"`;
            quoteAuthor.textContent = `— ${quotes[currentQuote].author}`;
            
            quoteText.style.opacity = 1;
            quoteAuthor.style.opacity = 1;
        }, 300);
    });
}

// Tambahkan inisialisasi komponen sidebar ke DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Jalankan inisialisasi komponen sidebar setelah komponen lain dimuat
    setTimeout(initSidebarComponents, 100);
    
    // Update pencapaian setiap kali ada perubahan pada tugas
    const originalAddTask = addTask;
    if (typeof originalAddTask === 'function') {
        addTask = function() {
            originalAddTask.apply(this, arguments);
            updateAchievements();
        };
    }
    
    const originalToggleTask = toggleTask;
    if (typeof originalToggleTask === 'function') {
        toggleTask = function() {
            originalToggleTask.apply(this, arguments);
            updateAchievements();
        };
    }
    
    const originalDeleteTask = deleteTask;
    if (typeof originalDeleteTask === 'function') {
        deleteTask = function() {
            originalDeleteTask.apply(this, arguments);
            updateAchievements();
        };
    }
});

// Script untuk loading screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingBar = document.getElementById('loadingBar');
    const loadingStatus = document.getElementById('loadingStatus');
    const loadingTip = document.getElementById('loadingTip');
    
    // Tambahkan data-text untuk efek glitch
    document.querySelector('.loading-title').setAttribute('data-text', 'Task4Shana');
    
    // Tips loading
    const tips = [
        "Tips: Gunakan fitur Pomodoro Timer untuk meningkatkan fokus!",
        "Tips: Tugas dengan prioritas tinggi akan muncul di bagian atas daftar.",
        "Tips: Jangan lupa cek pencapaian untuk melihat progres kamu!",
        "Tips: Klik pada tanggal di kalender untuk melihat tugas pada hari itu.",
        "Tips: Tetapkan fokus harian untuk meningkatkan produktivitas.",
        "Tips: Tema aplikasi dapat diubah melalui pengaturan.",
        "Tips: Gunakan fitur catatan cepat untuk ide-ide spontan.",
        "Tips: Selesaikan tugas secara konsisten untuk mendapatkan pencapaian.",
        "Tips: Filter tugas berdasarkan kategori untuk organisasi yang lebih baik."
    ];
    
    // Tampilkan tip acak
    loadingTip.textContent = tips[Math.floor(Math.random() * tips.length)];
    
    // Buat pixel particles
    createLoadingPixels();
    
    // Simulasi loading dengan tahapan
    const loadingSteps = [
        { progress: 10, message: "Memuat komponen UI..." },
        { progress: 25, message: "Menginisialisasi data..." },
        { progress: 40, message: "Menyiapkan tema..." },
        { progress: 60, message: "Memuat tugas kamu..." },
        { progress: 75, message: "Menyusun jadwal..." },
        { progress: 90, message: "Hampir selesai..." },
        { progress: 100, message: "Selamat datang di Task4Shana!" }
    ];
    
    let currentStep = 0;
    
    function updateLoadingStatus() {
        if (currentStep < loadingSteps.length) {
            const step = loadingSteps[currentStep];
            loadingBar.style.width = step.progress + '%';
            loadingStatus.textContent = step.message;
            currentStep++;
            
            // Jadwalkan langkah berikutnya
            setTimeout(updateLoadingStatus, 500);
        } else {
            // Loading selesai
            setTimeout(function() {
                loadingScreen.classList.add('fade-out');
                // Hapus loading screen setelah fade out
                setTimeout(function() {
                    loadingScreen.remove();
                }, 500);
            }, 500);
        }
    }
    
    // Buat pixel particles untuk efek visual
    function createLoadingPixels() {
        const pixelCount = 15;
        const container = loadingScreen;
        
        for (let i = 0; i < pixelCount; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'loading-pixel';
            
            // Posisi acak
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            
            // Warna acak
            const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Ukuran acak
            const size = Math.random() * 6 + 2;
            
            // Durasi animasi acak
            const duration = Math.random() * 3 + 2;
            
            // Delay acak
            const delay = Math.random() * 2;
            
            // Set style
            pixel.style.left = posX + 'px';
            pixel.style.top = posY + 'px';
            pixel.style.backgroundColor = color;
            pixel.style.width = size + 'px';
            pixel.style.height = size + 'px';
            pixel.style.animationDuration = duration + 's';
            pixel.style.animationDelay = delay + 's';
            
            container.appendChild(pixel);
        }
    }
    
    // Mulai animasi loading
    setTimeout(updateLoadingStatus, 500);
});

// Fungsi untuk inisialisasi komponen statistik
function initStatisticsComponent() {
    // Referensi elemen tab
    const analyticsTabs = document.querySelectorAll('.analytics-tab');
    const analyticsPanels = document.querySelectorAll('.analytics-panel');
    const dateRangeBtns = document.querySelectorAll('.date-range-btn');
    const exportStatsBtn = document.querySelector('.export-stats-btn');
    
    // Inisialisasi variabel untuk menyimpan data statistik
    let statisticsData = {
        currentRange: 'week',
        productivity: {},
        categories: {},
        completion: {},
        timePatterns: {}
    };
    
    // Event listener untuk tab
    analyticsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Hapus kelas active dari semua tab
            analyticsTabs.forEach(t => t.classList.remove('active'));
            // Tambahkan kelas active ke tab yang diklik
            tab.classList.add('active');
            
            // Tampilkan panel yang sesuai
            const tabId = tab.dataset.tab;
            analyticsPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${tabId}-panel`) {
                    panel.classList.add('active');
                }
            });
            
            // Perbarui grafik yang aktif
            updateActiveChart();
        });
    });
    
    // Event listener untuk selector rentang waktu
    dateRangeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus kelas active dari semua button
            dateRangeBtns.forEach(b => b.classList.remove('active'));
            // Tambahkan kelas active ke button yang diklik
            btn.classList.add('active');
            
            // Update range waktu yang dipilih
            statisticsData.currentRange = btn.dataset.range;
            
            // Perbarui semua grafik dengan range baru
            generateStatisticsData();
            updateAllCharts();
        });
    });
    
    // Event listener untuk tombol ekspor
    if (exportStatsBtn) {
        exportStatsBtn.addEventListener('click', exportStatistics);
    }
    
    // Fungsi untuk menghasilkan data statistik
    function generateStatisticsData() {
        // Mendapatkan tugas dari localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        // Filter berdasarkan rentang tanggal yang dipilih
        const filteredTasks = filterTasksByDateRange(tasks, statisticsData.currentRange);
        
        // Mengolah data untuk produktivitas harian/mingguan
        statisticsData.productivity = calculateProductivityData(filteredTasks);
        
        // Mengolah data untuk distribusi kategori
        statisticsData.categories = calculateCategoryDistribution(filteredTasks);
        
        // Mengolah data untuk statistik penyelesaian
        statisticsData.completion = calculateCompletionStats(filteredTasks);
        
        // Mengolah data untuk pola waktu
        statisticsData.timePatterns = calculateTimePatterns(filteredTasks);
        
        // Update nilai-nilai statistik
        updateStatisticsValues();
    }
    
    // Filter tugas berdasarkan rentang tanggal
    function filterTasksByDateRange(tasks, range) {
        const today = new Date();
        let startDate;
        
        switch(range) {
            case 'week':
                // Mulai dari awal minggu ini (Minggu)
                startDate = new Date(today);
                startDate.setDate(today.getDate() - today.getDay());
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'month':
                // Mulai dari awal bulan ini
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            case 'year':
                // Mulai dari awal tahun ini
                startDate = new Date(today.getFullYear(), 0, 1);
                break;
            default:
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 7);
        }
        
        return tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate >= startDate && taskDate <= today;
        });
    }
    
    // Menghitung data produktivitas
    function calculateProductivityData(tasks) {
        const today = new Date();
        const dayLabels = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        
        let labels = [];
        let completedData = [];
        let addedData = [];
        
        // Sesuaikan labels dan penghitungan data berdasarkan range
        if (statisticsData.currentRange === 'week') {
            // Data mingguan (7 hari terakhir)
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() - 6 + i);
                labels.push(dayLabels[date.getDay()]);
                
                const dayTasks = tasks.filter(task => {
                    const taskDate = new Date(task.date);
                    return taskDate.getDate() === date.getDate() && 
                           taskDate.getMonth() === date.getMonth() && 
                           taskDate.getFullYear() === date.getFullYear();
                });
                
                completedData.push(dayTasks.filter(task => task.completed).length);
                addedData.push(dayTasks.length);
            }
        } else if (statisticsData.currentRange === 'month') {
            // Data bulanan (bulan saat ini)
            const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(today.getFullYear(), today.getMonth(), i);
                
                // Skip if date is in the future
                if (date > today) break;
                
                labels.push(i);
                
                const dayTasks = tasks.filter(task => {
                    const taskDate = new Date(task.date);
                    return taskDate.getDate() === i && 
                           taskDate.getMonth() === today.getMonth() && 
                           taskDate.getFullYear() === today.getFullYear();
                });
                
                completedData.push(dayTasks.filter(task => task.completed).length);
                addedData.push(dayTasks.length);
            }
        } else if (statisticsData.currentRange === 'year') {
            // Data tahunan (12 bulan)
            for (let i = 0; i < 12; i++) {
                labels.push(monthLabels[i]);
                
                const monthTasks = tasks.filter(task => {
                    const taskDate = new Date(task.date);
                    return taskDate.getMonth() === i && 
                           taskDate.getFullYear() === today.getFullYear();
                });
                
                completedData.push(monthTasks.filter(task => task.completed).length);
                addedData.push(monthTasks.length);
            }
        }
        
        // Hitung statistik tambahan
        let totalCompleted = completedData.reduce((sum, val) => sum + val, 0);
        let totalAdded = addedData.reduce((sum, val) => sum + val, 0);
        let avgCompletionRate = totalAdded > 0 ? Math.round((totalCompleted / totalAdded) * 100) : 0;
        
        // Temukan hari paling produktif
        let mostProductiveIdx = 0;
        let maxCompleted = 0;
        for (let i = 0; i < completedData.length; i++) {
            if (completedData[i] > maxCompleted) {
                maxCompleted = completedData[i];
                mostProductiveIdx = i;
            }
        }
        
        return {
            labels,
            completedData,
            addedData,
            avgCompletionRate,
            mostProductiveDay: labels[mostProductiveIdx],
            streak: calculateCurrentStreak(tasks)
        };
    }
    
    // Menghitung streak saat ini
    function calculateCurrentStreak(tasks) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let streak = 0;
        let currentDate = new Date(today);
        
        // Check backwards from today
        while (true) {
            const dateStr = currentDate.toISOString().split('T')[0];
            
            // Check if there are completed tasks for this date
            const hasCompletedTask = tasks.some(task => {
                return task.date === dateStr && task.completed;
            });
            
            if (hasCompletedTask) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }
        
        return streak;
    }
    
    // Menghitung distribusi kategori
    function calculateCategoryDistribution(tasks) {
        const categories = {};
        const categoryColors = {
            'Sekolah': 'var(--secondary)',
            'Pribadi': 'var(--primary)',
            'Game': 'var(--accent)',
            'Lainnya': 'var(--warning)'
        };
        
        // Menghitung jumlah tugas per kategori
        tasks.forEach(task => {
            if (!categories[task.category]) {
                categories[task.category] = {
                    count: 0,
                    completed: 0,
                    color: categoryColors[task.category] || 'var(--dark-accent)'
                };
            }
            
            categories[task.category].count++;
            
            if (task.completed) {
                categories[task.category].completed++;
            }
        });
        
        // Konversi ke format yang sesuai untuk grafik
        const labels = Object.keys(categories);
        const data = labels.map(cat => categories[cat].count);
        const completedData = labels.map(cat => categories[cat].completed);
        const colors = labels.map(cat => categories[cat].color);
        
        // Hitung persentase penyelesaian per kategori
        const completionRates = {};
        labels.forEach(cat => {
            const rate = categories[cat].count > 0 
                ? Math.round((categories[cat].completed / categories[cat].count) * 100) 
                : 0;
            completionRates[cat] = rate;
        });
        
        return {
            labels,
            data,
            completedData,
            colors,
            categories,
            completionRates
        };
    }
    
    // Menghitung statistik penyelesaian
    function calculateCompletionStats(tasks) {
        // Hitung rata-rata waktu penyelesaian (jika ada timestamp)
        let completionTimes = [];
        tasks.forEach(task => {
            if (task.completed && task.completedAt && task.createdAt) {
                const created = new Date(task.createdAt);
                const completed = new Date(task.completedAt);
                const timeDiff = Math.abs(completed - created) / (1000 * 60 * 60); // dalam jam
                completionTimes.push(timeDiff);
            }
        });
        
        const avgCompletionTime = completionTimes.length > 0 
            ? (completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length).toFixed(1)
            : null;
        
        // Hitung tingkat penyelesaian berdasarkan prioritas
        const priorityStats = {
            'high': { total: 0, completed: 0 },
            'medium': { total: 0, completed: 0 },
            'low': { total: 0, completed: 0 }
        };
        
        tasks.forEach(task => {
            const priority = task.priority || 'medium';
            priorityStats[priority].total++;
            
            if (task.completed) {
                priorityStats[priority].completed++;
            }
        });
        
        // Hitung persentase
        const priorityCompletion = {};
        Object.keys(priorityStats).forEach(priority => {
            priorityCompletion[priority] = priorityStats[priority].total > 0 
                ? Math.round((priorityStats[priority].completed / priorityStats[priority].total) * 100)
                : 0;
        });
        
        // Data untuk grafik penyelesaian berdasarkan status
        const completionData = [
            tasks.filter(task => task.completed).length,
            tasks.filter(task => !task.completed).length
        ];
        
        return {
            avgCompletionTime,
            priorityStats,
            priorityCompletion,
            completionData
        };
    }
    
    // Menghitung pola waktu
    function calculateTimePatterns(tasks) {
        // Bagi hari menjadi 4 periode
        const timePeriods = {
            'Pagi (5-11)': { total: 0, completed: 0 },
            'Siang (11-15)': { total: 0, completed: 0 },
            'Sore (15-19)': { total: 0, completed: 0 },
            'Malam (19-5)': { total: 0, completed: 0 }
        };
        
        // Hitung jumlah tugas yang diselesaikan per periode waktu (jika ada timestamp)
        tasks.forEach(task => {
            if (task.completedAt) {
                const completedTime = new Date(task.completedAt);
                const hour = completedTime.getHours();
                
                let period;
                if (hour >= 5 && hour < 11) {
                    period = 'Pagi (5-11)';
                } else if (hour >= 11 && hour < 15) {
                    period = 'Siang (11-15)';
                } else if (hour >= 15 && hour < 19) {
                    period = 'Sore (15-19)';
                } else {
                    period = 'Malam (19-5)';
                }
                
                timePeriods[period].total++;
                
                if (task.completed) {
                    timePeriods[period].completed++;
                }
            }
        });
        
        // Menentukan waktu terbaik (periode dengan tingkat penyelesaian tertinggi)
        let bestTime = '';
        let bestRate = 0;
        
        Object.keys(timePeriods).forEach(period => {
            if (timePeriods[period].total > 0) {
                const rate = timePeriods[period].completed / timePeriods[period].total;
                if (rate > bestRate) {
                    bestRate = rate;
                    bestTime = period;
                }
            }
        });
        
        // Menghitung rata-rata tugas per hari
        const uniqueDates = new Set();
        tasks.forEach(task => {
            uniqueDates.add(task.date);
        });
        
        const tasksPerDay = uniqueDates.size > 0 
            ? Math.round((tasks.length / uniqueDates.size) * 10) / 10
            : 0;
        
        // Data untuk grafik
        const labels = Object.keys(timePeriods);
        const data = labels.map(period => timePeriods[period].total);
        const completedData = labels.map(period => timePeriods[period].completed);
        
        return {
            timePeriods,
            bestTime: bestTime || 'Belum cukup data',
            tasksPerDay,
            labels,
            data,
            completedData
        };
    }
    
    // Update nilai-nilai statistik pada UI
    function updateStatisticsValues() {
        // Produktivitas
        const avgCompletionRateEl = document.getElementById('avgCompletionRate');
        const mostProductiveDayEl = document.getElementById('mostProductiveDay');
        const currentStreakEl = document.getElementById('currentStreak');
        
        if (avgCompletionRateEl) avgCompletionRateEl.textContent = `${statisticsData.productivity.avgCompletionRate}%`;
        if (mostProductiveDayEl) mostProductiveDayEl.textContent = statisticsData.productivity.mostProductiveDay || '-';
        if (currentStreakEl) currentStreakEl.textContent = statisticsData.productivity.streak || '0';
        
        // Kategori
        const categoryStatsList = document.getElementById('categoryStatsList');
        if (categoryStatsList) {
            categoryStatsList.innerHTML = '';
            
            if (statisticsData.categories.labels && statisticsData.categories.labels.length > 0) {
                statisticsData.categories.labels.forEach((category, index) => {
                    const count = statisticsData.categories.data[index];
                    const completed = statisticsData.categories.completedData[index];
                    const rate = count > 0 ? Math.round((completed / count) * 100) : 0;
                    const color = statisticsData.categories.colors[index];
                    
                    const categoryItem = document.createElement('div');
                    categoryItem.className = 'category-stat-item';
                    categoryItem.style.borderLeftColor = color;
                    
                    categoryItem.innerHTML = `
                        <div class="category-color" style="background-color: ${color};"></div>
                        <div class="category-stat-info">
                            <div class="category-name">${category}</div>
                            <div class="category-count">${completed}/${count} (${rate}%)</div>
                        </div>
                    `;
                    
                    categoryStatsList.appendChild(categoryItem);
                });
            } else {
                categoryStatsList.innerHTML = '<div class="empty-state">Belum ada data tugas</div>';
            }
        }
        
        // Penyelesaian
        const avgCompletionTimeEl = document.getElementById('avgCompletionTime');
        const completionRateByPriorityEl = document.getElementById('completionRateByPriority');
        
        if (avgCompletionTimeEl) {
            if (statisticsData.completion.avgCompletionTime) {
                const hours = statisticsData.completion.avgCompletionTime;
                
                if (hours < 1) {
                    avgCompletionTimeEl.textContent = `${Math.round(hours * 60)} menit`;
                } else if (hours < 24) {
                    avgCompletionTimeEl.textContent = `${hours} jam`;
                } else {
                    avgCompletionTimeEl.textContent = `${Math.round(hours / 24)} hari`;
                }
            } else {
                avgCompletionTimeEl.textContent = 'Belum ada data';
            }
        }
        
        if (completionRateByPriorityEl) {
            if (statisticsData.completion.priorityCompletion) {
                const high = statisticsData.completion.priorityCompletion.high || 0;
                const medium = statisticsData.completion.priorityCompletion.medium || 0;
                const low = statisticsData.completion.priorityCompletion.low || 0;
                
                completionRateByPriorityEl.innerHTML = `<span style="color:var(--danger)">Tinggi: ${high}%</span>, <span style="color:var(--warning)">Sedang: ${medium}%</span>, <span style="color:var(--accent)">Rendah: ${low}%</span>`;
            } else {
                completionRateByPriorityEl.textContent = 'Belum ada data';
            }
        }
        
        // Performa Waktu
        const bestTimeOfDayEl = document.getElementById('bestTimeOfDay');
        const tasksPerDayEl = document.getElementById('tasksPerDay');
        
        if (bestTimeOfDayEl) bestTimeOfDayEl.textContent = statisticsData.timePatterns.bestTime || 'Belum cukup data';
        if (tasksPerDayEl) tasksPerDayEl.textContent = statisticsData.timePatterns.tasksPerDay;
    }
    
    // Update grafik yang aktif saat ini
    function updateActiveChart() {
        const activePanel = document.querySelector('.analytics-panel.active');
        if (!activePanel) return;
        
        const panelId = activePanel.id;
        
        switch(panelId) {
            case 'productivity-panel':
                updateProductivityChart();
                break;
            case 'categories-panel':
                updateCategoriesChart();
                break;
            case 'completion-panel':
                updateCompletionChart();
                break;
            case 'time-panel':
                updateTimePatternChart();
                break;
        }
    }
    
    // Update semua grafik
    function updateAllCharts() {
        updateProductivityChart();
        updateCategoriesChart();
        updateCompletionChart();
        updateTimePatternChart();
    }
    
    // Variabel untuk menyimpan instance grafik
    let productivityChart = null;
    let categoriesChart = null;
    let completionChart = null;
    let timePatternChart = null;
    
    // Fungsi untuk membersihkan dan memperbarui grafik produktivitas
    function updateProductivityChart() {
        const ctx = document.getElementById('weeklyProductivityChart');
        if (!ctx) return;
        
        // Jika grafik sudah ada, hancurkan dulu
        if (productivityChart) {
            productivityChart.destroy();
        }
        
        // Buat grafik baru
        productivityChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: statisticsData.productivity.labels || [],
                datasets: [
                    {
                        label: 'Tugas Diselesaikan',
                        data: statisticsData.productivity.completedData || [],
                        backgroundColor: 'rgba(5, 255, 161, 0.7)',
                        borderColor: 'rgba(5, 255, 161, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Total Tugas',
                        data: statisticsData.productivity.addedData || [],
                        backgroundColor: 'rgba(255, 113, 206, 0.3)',
                        borderColor: 'rgba(255, 113, 206, 1)',
                        borderWidth: 1,
                        type: 'line',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            precision: 0
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }
    
    // Fungsi untuk membersihkan dan memperbarui grafik kategori
    function updateCategoriesChart() {
        const ctx = document.getElementById('categoriesChart');
        if (!ctx) return;
        
        // Jika grafik sudah ada, hancurkan dulu
        if (categoriesChart) {
            categoriesChart.destroy();
        }
        
        // Buat grafik baru
        categoriesChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: statisticsData.categories.labels || [],
                datasets: [{
                    data: statisticsData.categories.data || [],
                    backgroundColor: statisticsData.categories.colors || [],
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }
    
    // Fungsi untuk membersihkan dan memperbarui grafik penyelesaian
    function updateCompletionChart() {
        const ctx = document.getElementById('completionChart');
        if (!ctx) return;
        
        // Jika grafik sudah ada, hancurkan dulu
        if (completionChart) {
            completionChart.destroy();
        }
        
        // Buat grafik baru
        completionChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Selesai', 'Belum Selesai'],
                datasets: [{
                    data: statisticsData.completion.completionData || [0, 0],
                    backgroundColor: [
                        'rgba(5, 255, 161, 0.7)',
                        'rgba(255, 113, 206, 0.7)'
                    ],
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }
    
    // Fungsi untuk membersihkan dan memperbarui grafik pola waktu
    function updateTimePatternChart() {
        const ctx = document.getElementById('timePatternChart');
        if (!ctx) return;
        
        // Jika grafik sudah ada, hancurkan dulu
        if (timePatternChart) {
            timePatternChart.destroy();
        }
        
        // Buat grafik baru
        timePatternChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: statisticsData.timePatterns.labels || [],
                datasets: [
                    {
                        label: 'Tugas Diselesaikan',
                        data: statisticsData.timePatterns.completedData || [],
                        backgroundColor: 'rgba(5, 255, 161, 0.3)',
                        borderColor: 'rgba(5, 255, 161, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(5, 255, 161, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(5, 255, 161, 1)'
                    },
                    {
                        label: 'Total Tugas',
                        data: statisticsData.timePatterns.data || [],
                        backgroundColor: 'rgba(1, 205, 254, 0.3)',
                        borderColor: 'rgba(1, 205, 254, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(1, 205, 254, 1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(1, 205, 254, 1)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.2)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            backdropColor: 'transparent'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                }
            }
        });
    }
    
    // Ekspor statistik sebagai file JSON
    function exportStatistics() {
        // Buat objek untuk ekspor
        const exportData = {
            exportDate: new Date().toISOString(),
            range: statisticsData.currentRange,
            productivity: statisticsData.productivity,
            categories: statisticsData.categories,
            completion: statisticsData.completion,
            timePatterns: statisticsData.timePatterns
        };
        
        // Konversi ke string JSON
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        // Buat nama file
        const exportFileDefaultName = `task4shana_stats_${new Date().toISOString().split('T')[0]}.json`;
        
        // Buat link untuk download dan klik
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        // Tampilkan notifikasi
        showNotification('Statistik berhasil diekspor!', 'success');
    }
    
    // Inisialisasi komponen
    function init() {
        // Muat Chart.js dari CDN jika belum ada
        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js';
            script.onload = function() {
                // Setelah Chart.js dimuat, lanjutkan inisialisasi
                generateStatisticsData();
                updateAllCharts();
            };
            document.head.appendChild(script);
        } else {
            // Chart.js sudah dimuat, lanjutkan inisialisasi
            generateStatisticsData();
            updateAllCharts();
        }
        
        // Set up observer untuk memantau perubahan tugas
        setupTasksObserver();
    }
    
    // Pantau perubahan pada daftar tugas
    function setupTasksObserver() {
        // Gunakan interval untuk memeriksa perubahan
        setInterval(() => {
            const currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const filteredTasks = filterTasksByDateRange(currentTasks, statisticsData.currentRange);
            
            // Periksa apakah jumlah tugas berubah
            const currentTaskCount = filteredTasks.length;
            const completedTaskCount = filteredTasks.filter(task => task.completed).length;
            
            if (currentTaskCount !== (statisticsData.productivity.addedData || []).reduce((sum, val) => sum + val, 0) ||
                completedTaskCount !== (statisticsData.productivity.completedData || []).reduce((sum, val) => sum + val, 0)) {
                // Perbarui data dan grafik
                generateStatisticsData();
                updateAllCharts();
            }
        }, 5000); // Periksa setiap 5 detik
    }
    
    // Mulai inisialisasi
    init();
}

// Tambahkan inisialisasi komponen statistik ke event listener DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Pastikan komponen statistik diinisialisasi setelah komponen lain dimuat
    setTimeout(initStatisticsComponent, 300);
});


// Fungsi untuk inisialisasi komponen galeri foto
function initPhotoGallery() {
    // Referensi untuk elemen-elemen DOM
    const galleryCarousel = document.getElementById('galleryCarousel');
    const galleryIndicators = document.getElementById('galleryIndicators');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const photoTitle = document.getElementById('photoTitle');
    const photoDate = document.getElementById('photoDate');
    const photoDescription = document.getElementById('photoDescription');
    
    // Tombol kontrol
    const addPhotoBtn = document.getElementById('addPhotoBtn');
    const editPhotoBtn = document.getElementById('editPhotoBtn');
    const deletePhotoBtn = document.getElementById('deletePhotoBtn');
    
    // Modal elemen
    const photoModal = document.getElementById('photoModal');
    const photoModalClose = document.getElementById('photoModalClose');
    const photoModalTitle = document.getElementById('photoModalTitle');
    const photoPreview = document.getElementById('photoPreview');
    const photoInput = document.getElementById('photoInput');
    const photoTitleInput = document.getElementById('photoTitleInput');
    const photoDescriptionInput = document.getElementById('photoDescriptionInput');
    const savePhotoBtn = document.getElementById('savePhotoBtn');
    
    // Modal lihat foto besar
    const viewPhotoModal = document.getElementById('viewPhotoModal');
    const viewPhotoModalClose = document.getElementById('viewPhotoModalClose');
    const largePhotoContainer = document.getElementById('largePhotoContainer');
    const largePhotoTitle = document.getElementById('largePhotoTitle');
    const largePhotoDate = document.getElementById('largePhotoDate');
    const largePhotoDesc = document.getElementById('largePhotoDesc');
    
    // Data untuk galeri
    let photos = JSON.parse(localStorage.getItem('galleryPhotos')) || [];
    let currentPhotoIndex = 0;
    let editingPhotoIndex = -1;
    
    // Function untuk memperbarui carousel
    function updateCarousel() {
        if (photos.length === 0) {
            // Tampilkan placeholder jika tidak ada foto
            galleryCarousel.innerHTML = `
                <div class="carousel-item active">
                    <div class="gallery-placeholder">
                        <i class="fas fa-image"></i>
                        <p>Belum ada foto</p>
                    </div>
                </div>
            `;
            
            galleryIndicators.innerHTML = '';
            photoTitle.textContent = 'Galeri Kenangan';
            photoDate.textContent = '';
            photoDescription.textContent = '';
            
            // Sembunyikan tombol edit dan hapus
            editPhotoBtn.style.display = 'none';
            deletePhotoBtn.style.display = 'none';
            
            return;
        }
        
        // Tampilkan tombol edit dan hapus jika ada foto
        editPhotoBtn.style.display = 'flex';
        deletePhotoBtn.style.display = 'flex';
        
        // Bangun carousel
        galleryCarousel.innerHTML = '';
        galleryIndicators.innerHTML = '';
        
        photos.forEach((photo, index) => {
            // Buat carousel item
            const item = document.createElement('div');
            item.className = 'carousel-item';
            if (index === currentPhotoIndex) item.classList.add('active');
            
            // Buat image dari data Base64
            item.innerHTML = `<img src="${photo.dataUrl}" alt="${photo.title}">`;
            
            // Event listener untuk klik foto (lihat besar)
            item.querySelector('img').addEventListener('click', () => {
                showLargePhoto(index);
            });
            
            galleryCarousel.appendChild(item);
            
            // Buat indikator
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === currentPhotoIndex) indicator.classList.add('active');
            
            // Event listener untuk indikator
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
            
            galleryIndicators.appendChild(indicator);
        });
        
        // Update judul, tanggal, dan deskripsi
        updatePhotoDetails();
    }
    
    // Fungsi untuk update detail foto yang ditampilkan
    function updatePhotoDetails() {
        if (photos.length === 0) return;
        
        const currentPhoto = photos[currentPhotoIndex];
        photoTitle.textContent = currentPhoto.title;
        
        // Format tanggal
        if (currentPhoto.date) {
            const date = new Date(currentPhoto.date);
            photoDate.textContent = date.toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            });
        } else {
            photoDate.textContent = '';
        }
        
        photoDescription.textContent = currentPhoto.description || '';
    }
    
    // Navigasi carousel
    function goToSlide(index) {
        // Pastikan index valid
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        
        currentPhotoIndex = index;
        
        // Update tampilan carousel (dalam implementasi penuh akan menggunakan transform)
        const items = galleryCarousel.querySelectorAll('.carousel-item');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Update indikator
        const indicators = galleryIndicators.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Update detail foto
        updatePhotoDetails();
    }
    
    // Navigasi ke slide sebelumnya
    function goToPrevSlide() {
        goToSlide(currentPhotoIndex - 1);
    }
    
    // Navigasi ke slide selanjutnya
    function goToNextSlide() {
        goToSlide(currentPhotoIndex + 1);
    }
    
    // Tampilkan foto dalam ukuran besar
    function showLargePhoto(index) {
        if (photos.length === 0 || index < 0 || index >= photos.length) return;
        
        const photo = photos[index];
        
        // Set content
        largePhotoContainer.innerHTML = `<img src="${photo.dataUrl}" alt="${photo.title}">`;
        largePhotoTitle.textContent = photo.title;
        
        // Format tanggal
        if (photo.date) {
            const date = new Date(photo.date);
            largePhotoDate.textContent = date.toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            });
        } else {
            largePhotoDate.textContent = '';
        }
        
        largePhotoDesc.textContent = photo.description || '';
        
        // Tampilkan modal
        viewPhotoModal.classList.add('show');
    }
    
    // Buka modal tambah foto
    function openAddPhotoModal() {
        // Reset modal
        photoModalTitle.textContent = 'Tambah Foto Baru';
        photoPreview.innerHTML = `
            <div class="photo-placeholder">
                <i class="fas fa-image"></i>
                <p>Pratinjau Foto</p>
            </div>
        `;
        photoTitleInput.value = '';
        photoDescriptionInput.value = '';
        editingPhotoIndex = -1;
        
        // Tampilkan modal
        photoModal.classList.add('show');
    }
    
    // Buka modal edit foto
    function openEditPhotoModal() {
        if (photos.length === 0) return;
        
        const photo = photos[currentPhotoIndex];
        
        // Set modal untuk editing
        photoModalTitle.textContent = 'Edit Foto';
        photoPreview.innerHTML = `<img src="${photo.dataUrl}" alt="${photo.title}">`;
        photoTitleInput.value = photo.title;
        photoDescriptionInput.value = photo.description || '';
        editingPhotoIndex = currentPhotoIndex;
        
        // Tampilkan modal
        photoModal.classList.add('show');
    }
    
    // Konfirmasi hapus foto
    function confirmDeletePhoto() {
        if (photos.length === 0) return;
        
        const confirmDelete = confirm('Apakah Anda yakin ingin menghapus foto ini?');
        if (confirmDelete) {
            deletePhoto();
        }
    }
    
    // Hapus foto
    function deletePhoto() {
        if (photos.length === 0 || currentPhotoIndex < 0 || currentPhotoIndex >= photos.length) return;
        
        // Hapus foto dari array
        photos.splice(currentPhotoIndex, 1);
        
        // Simpan ke local storage
        localStorage.setItem('galleryPhotos', JSON.stringify(photos));
        
        // Update index yang aktif jika perlu
        if (currentPhotoIndex >= photos.length) {
            currentPhotoIndex = Math.max(0, photos.length - 1);
        }
        
        // Update tampilan
        updateCarousel();
        
        // Tampilkan notifikasi
        if (typeof showNotification === 'function') {
            showNotification('Foto berhasil dihapus!', 'info');
        } else {
            alert('Foto berhasil dihapus!');
        }
    }
    
    // Handle file input change
    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // Validasi tipe file
        if (!file.type.match('image.*')) {
            alert('Silakan pilih file gambar yang valid.');
            return;
        }
        
        // Batasi ukuran file (2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Ukuran file terlalu besar. Maksimum 2MB.');
            return;
        }
        
        // Baca file sebagai Data URL
        const reader = new FileReader();
        reader.onload = function(e) {
            // Update preview
            photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            
            // Simpan data URL untuk digunakan nanti
            photoPreview.dataset.dataUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    // Save foto
    function savePhoto() {
        const title = photoTitleInput.value.trim();
        const description = photoDescriptionInput.value.trim();
        
        // Validasi judul
        if (!title) {
            alert('Silakan masukkan judul foto.');
            return;
        }
        
        // Untuk edit, kita tidak memerlukan file baru
        if (editingPhotoIndex >= 0 && editingPhotoIndex < photos.length) {
            // Update foto yang ada
            photos[editingPhotoIndex].title = title;
            photos[editingPhotoIndex].description = description;
            
            // Simpan ke local storage
            localStorage.setItem('galleryPhotos', JSON.stringify(photos));
            
            // Update tampilan
            updateCarousel();
            
            // Tutup modal
            photoModal.classList.remove('show');
            
            // Tampilkan notifikasi
            if (typeof showNotification === 'function') {
                showNotification('Foto berhasil diperbarui!', 'success');
            } else {
                alert('Foto berhasil diperbarui!');
            }
            
            return;
        }
        
        // Untuk tambah foto baru, kita memerlukan data URL
        const dataUrl = photoPreview.dataset.dataUrl;
        if (!dataUrl) {
            alert('Silakan pilih foto terlebih dahulu.');
            return;
        }
        
        // Buat objek foto baru
        const newPhoto = {
            id: Date.now(), // ID unik
            title: title,
            description: description,
            dataUrl: dataUrl,
            date: new Date().toISOString()
        };
        
        // Tambahkan ke array photos
        photos.push(newPhoto);
        
        // Simpan ke local storage
        localStorage.setItem('galleryPhotos', JSON.stringify(photos));
        
        // Update carousel dan set foto baru sebagai yang aktif
        currentPhotoIndex = photos.length - 1;
        updateCarousel();
        
        // Tutup modal
        photoModal.classList.remove('show');
        
        // Tampilkan notifikasi
        if (typeof showNotification === 'function') {
            showNotification('Foto berhasil ditambahkan!', 'success');
        } else {
            alert('Foto berhasil ditambahkan!');
        }
    }
    
    // Event listeners
    if (galleryPrev) galleryPrev.addEventListener('click', goToPrevSlide);
    if (galleryNext) galleryNext.addEventListener('click', goToNextSlide);
    
    if (addPhotoBtn) addPhotoBtn.addEventListener('click', openAddPhotoModal);
    if (editPhotoBtn) editPhotoBtn.addEventListener('click', openEditPhotoModal);
    if (deletePhotoBtn) deletePhotoBtn.addEventListener('click', confirmDeletePhoto);
    
    if (photoModalClose) photoModalClose.addEventListener('click', () => {
        photoModal.classList.remove('show');
    });
    
    if (viewPhotoModalClose) viewPhotoModalClose.addEventListener('click', () => {
        viewPhotoModal.classList.remove('show');
    });
    
    if (photoInput) photoInput.addEventListener('change', handleFileSelect);
    if (savePhotoBtn) savePhotoBtn.addEventListener('click', savePhoto);
    
    // Tambahkan event listener keyboard untuk navigasi
    document.addEventListener('keydown', function(e) {
        // Cek jika modal foto besar sedang terbuka
        if (viewPhotoModal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                goToPrevSlide();
                showLargePhoto(currentPhotoIndex);
            } else if (e.key === 'ArrowRight') {
                goToNextSlide();
                showLargePhoto(currentPhotoIndex);
            } else if (e.key === 'Escape') {
                viewPhotoModal.classList.remove('show');
            }
        }
    });
    
    // Inisialisasi tampilan
    updateCarousel();
}

// Tambahkan inisialisasi komponen galeri foto ke event listener DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi komponen galeri foto setelah komponen lain dimuat
    setTimeout(initPhotoGallery, 300);
});
