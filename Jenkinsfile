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

    }
}
