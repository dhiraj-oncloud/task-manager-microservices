pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                dir('user-service') {
                    sh 'node -v'
                    sh 'npm -v'
                    sh 'npm ci'
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('user-service') {
                    sh 'pwd'
                    sh 'ls -l'
                    sh 'docker build -t user-service:jenkins .'
                }
            }
        }

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

        stage('Test Credentials') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-cred-id',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "Jenkins Read Username: $DOCKER_USER"
                        echo "Password Length: ${#DOCKER_PASS}"
                    '''
                }
            }
        }

    }
}
