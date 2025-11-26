pipeline {
    agent any

    stages {
        stage('Debug Tools') {
            steps {
                sh 'which node || echo "node not found"'
                sh 'which npm || echo "npm not found"'
                sh 'env | sort'
            }
        }
    }
}
