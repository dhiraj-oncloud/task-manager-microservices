pipeline {
    agent any

    stages {

        // 1️⃣ Checkout the code from Git
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // 2️⃣ Node Build
        stage('Build') {
            steps {
                dir('user-service') {
                    sh 'node -v'
                    sh 'npm -v'
                    sh 'npm ci'
                }
            }
        }

        // 3️⃣ Docker Build
        stage('Docker Build') {
            steps {
                dir('user-service') {
                    sh 'pwd'
                    sh 'ls -l'
                    sh 'docker build -t user-service:jenkins .'
                }
            }
        }

        // 4️⃣ Docker Run
        stage('Docker Run') {
            steps {
                dir('user-service') {
                    sh '''
                        docker rm -f user-service || true
                        docker run -d -p 3000:3000 --name user-service user-service:jenkins
                    '''
                }
            }
        }

        // 5️⃣ Docker Push to DockerHub
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    dir('user-service') {
                        sh '''
                            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                            docker tag user-service:jenkins dhirajoncloud/user-service:latest
                            docker push dhirajoncloud/user-service:latest
                        '''
                    }
                }
            }
        }

        // 6️⃣ Test Stage
        stage('Test') {
            steps {
                dir('user-service') {
                    sh 'npm test || true'
                }
            }
        }
        stage('EC2 SSH Test') {
    steps {
        sshagent(['ec2-ssh-key']) {
            sh '''
              ssh -o StrictHostKeyChecking=no ec2-user@34.224.23.112 "hostname && whoami"
            '''
        }
    }
}


    }
}
