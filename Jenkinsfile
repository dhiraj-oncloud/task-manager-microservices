pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

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
    }
}
