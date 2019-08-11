export default function({ $axios, redirext }) {
  $axios.onResponse(config => {
    $axios.setHeader('Access-Control-Allow-Origin', 'https://qiita.com')
  })
}