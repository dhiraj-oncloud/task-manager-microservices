pipeline {
    agent any

    tools {
        nodejs 'node20'
    }

    stages {
        stage('Check Node') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
    }
}
