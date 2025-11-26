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
                    sh 'which node'
                    sh 'node -v'
                    sh 'which npm'
                    sh 'npm -v'
                    sh 'npm ci'
                }
            }
        }
    }
}
