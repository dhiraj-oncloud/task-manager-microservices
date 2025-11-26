pipeline {
    agent any

    stages {
        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                checkout scm
                sh 'ls -l'
            }
        }

        stage('Check Code') {
            steps {
                sh 'pwd'
                sh 'ls -R'
            }
        }
    }
}
