pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checkout code from GitHub'
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Install dependencies'
                dir('user-service') {
                    sh 'node -v'
                    sh 'npm -v'
                    sh 'npm ci'
                }
            }
        }
    }
}
