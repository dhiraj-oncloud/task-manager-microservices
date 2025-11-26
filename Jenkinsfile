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
                    sh 'npm test'
                }
            }
        }
    }
}
