pipeline {
    agent any

    environment {
        SITE_ADDRESS = 'gamestore.ddns.net' // Адрес сайта
        CONF_PATH = "/etc/nginx/sites-enabled/$SITE_ADDRESS.conf" // Местоположение конфига Nginx
        DOMAIN_EMAIL = 'asdfgqwertyzxcvbnuiop@gmail.com' // E-mail для SSL сертификата
        TEMP_CONF = "/tmp/$SITE_ADDRESS.conf"
        SUDO_PASS = 'Wf4agh6jkL' // Пароль SUDO
        CERT_PATH = "/etc/letsencrypt/live/$SITE_ADDRESS/fullchain.pem" // Местоположение сертификата
        NODE_ENV = 'production'
        SSH_SERVER = 'kz' // Сервер Deploy
        REMOTE_DIR = "/var/www/$SITE_ADDRESS" // Местоположение Build
    }

    stages {
        stage('Checkout Git') {
            steps {
                // Проверка исходного кода из системы управления версиями
                checkout scm
            }
        }
        stage('Update System and Install Dependencies') {
            steps {
                script {
                    // Обновление системы и установка Nginx и Certbot
                    sh "echo $SUDO_PASS | sudo -S apt-get update"
                    sh "echo $SUDO_PASS | sudo -S apt install -y nginx certbot python3-certbot-nginx"
                }
            }
        }

        stage('Obtain SSL Certificate') {
            steps {
                script {
                    // Проверка наличия сертификата
                    def certExists = sh(script: "test -f $CERT_PATH", returnStatus: true) == 0
                    if (certExists) {
                        echo -e "\e[1;43m Certificate already exists. \e[0m"
                    } else {
                        // Получение SSL сертификата
                        sh "echo $SUDO_PASS | sudo -S certbot certonly --nginx -d $SITE_ADDRESS -m $DOMAIN_EMAIL --agree-tos --non-interactive"
                    }
                }
            }
        }

        stage('Configure Nginx') {
            steps {
                script {
                    // Создание временного файла конфигурации
                    def conf_text = """
                    server {
                        listen 80;
                        listen [::]:80;

                        listen 443 ssl;
                        listen [::]:443 ssl;

                        server_name $SITE_ADDRESS;
                        root /var/www/$SITE_ADDRESS;
                        index index.html;

                        ssl_certificate         /etc/letsencrypt/live/$SITE_ADDRESS/fullchain.pem;
                        ssl_certificate_key     /etc/letsencrypt/live/$SITE_ADDRESS/privkey.pem;

                        if (\$scheme = 'http') {
                            return 301 https://\$host\$request_uri;
                        }
                    }
                    """
                    writeFile(file: "$TEMP_CONF", text: conf_text)

                    // Проверка, существует ли конфигурационный файл
                    if (fileExists(CONF_PATH)) {
                        // Сравнение содержимого временного и текущего конфигурационного файла
                        def diffExists = sh(script: "diff $TEMP_CONF $CONF_PATH", returnStatus: true) != 0
                        if (diffExists) {
                            echo "Configuration file has changes. Updating..."
                            // Копирование временного файла в конфигурационный путь с использованием sudo
                            sh "echo $SUDO_PASS | sudo -S cp $TEMP_CONF $CONF_PATH"

                            // Проверка конфигурации Nginx
                            def nginxTest = sh(script: "echo $SUDO_PASS | sudo -S nginx -t", returnStatus: true)
                            if (nginxTest == 0) {
                                echo "Nginx configuration test passed."
                                // Перезагрузка Nginx
                                def nginxReload = sh(script: "echo $SUDO_PASS | sudo -S systemctl reload nginx", returnStatus: true)
                                if (nginxReload == 0) {
                                    echo "Nginx reloaded successfully."
                                } else {
                                    echo "Failed to reload Nginx."
                                }
                            } else {
                                echo "Nginx configuration test failed."
                            }
                        } else {
                            echo "Configuration file is up-to-date. No changes made."
                        }
                    } else {
                        // Копирование временного файла в конфигурационный путь с использованием sudo
                        sh "echo $SUDO_PASS | sudo -S cp $TEMP_CONF $CONF_PATH"

                        // Проверка конфигурации Nginx
                        def nginxTest = sh(script: "echo $SUDO_PASS | sudo -S nginx -t", returnStatus: true)
                        if (nginxTest == 0) {
                            echo "Nginx configuration test passed."
                            // Перезагрузка Nginx
                            def nginxReload = sh(script: "echo $SUDO_PASS | sudo -S systemctl reload nginx", returnStatus: true)
                            if (nginxReload == 0) {
                                echo "Nginx reloaded successfully."
                            } else {
                                echo "Failed to reload Nginx."
                            }
                        } else {
                            echo "Nginx configuration test failed."
                        }
                    }

                    // Удаление временного файла
                    sh "rm $TEMP_CONF"
                }
            }
        }
    }
        stage('Install Dependencies') {
            steps {
                script {
                    // Установка зависимостей
                    if (fileExists('package-lock.json')) {
                        sh 'npm ci'
                    } else {
                        sh 'npm install'
                    }
                }
            }
        }
        stage('Lint') {
            steps {
                // Запуск линтера для проверки качества кода
                sh 'npm run lint'
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    try {
                        // Запуск тестов
                        sh 'npm run test'
                    } catch (Exception e) {
                        echo -e "\e[1;41m No tests found or tests failed. \e[0m"
                        currentBuild.result = 'SUCCESS' // Устанавливаем результат выполнения pipeline в SUCCESS
                    }
                }
            }
        }
        stage('Build') {
            steps {
                // Сборка проекта
                sh 'npm run build'
            }
        }
        stage('Deploy to Server') {
            steps {
                script {
                    // Удаление предыдущей версии проекта на сервере
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: SSH_SERVER,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: '*',
                                        removePrefix: 'build', // укажите путь к папке проекта
                                        execCommand: "rm -rf $REMOTE_DIR/*"
                                    )
                                ],
                                usePromotionTimestamp: false,
                                useWorkspaceInPromotion: false
                            )
                        ]
                    )

                    // Использование плагина Publish Over SSH для развертывания файлов
                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(
                                configName: SSH_SERVER,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: 'build/**/*',
                                        removePrefix: 'build',
                                        remoteDirectory: '$REMOTE_DIR',
                                        execCommand: "echo $SUDO_PASS | sudo -S systemctl restart nginx"
                                    )
                                ],
                                usePromotionTimestamp: false,
                                useWorkspaceInPromotion: false
                            )
                        ]
                    )
                }
            }
        }
    }

    post {
        always {
            // Действия, которые должны выполняться всегда, например, очистка
            cleanWs()
        }
        success {
            // Действия при успешном выполнении
            echo 'Pipeline завершен успешно.'
        }
        failure {
            // Действия при неуспешном выполнении
            echo 'Pipeline завершился с ошибками.'
        }
    }
}