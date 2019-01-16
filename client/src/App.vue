<template>
	<div id="app">
		<h1>ようこそわたしのホームページへ！</h1>
		1.<router-link to="/">INDEX</router-link><br />
		2.<router-link to="/page1">PAGE1</router-link><br />
		3.<router-link to="/page2">PAGE2</router-link><br />
		<a href="/hello">hello</a> | 
		<a href="/api">api</a><br />
		<hr />
		<router-view />
	</div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
