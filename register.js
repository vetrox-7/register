
const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const moment = require("moment")
const fs = require("fs")
const db = require("quick.db")
const chalk = require("chalk")
require('./util/Loader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`)
  files.forEach(f => {                    
    let props = require(`./commands/${f}`)
    console.log(`${props.config.name} komutu yüklendi.`)
    client.commands.set(props.config.name, props)
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name)
    });
  });
})

client.on('message', async message => {
  
  if(message.content === '.tag') {
    message.channel.send(`\`${ayarlar.tag}\``)
  }
  })

client.on("ready", () => {
    console.log(chalk.redBright(`tm`))
})

// BOTUN İNTENTLERİNİ AÇMAYI UNUTMAYIN 

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `0`,
            '1': `1`,
            '2': `2`,
            '3': `3`,
            '4': `4`, 
            '5': `5`,
            '6': `6`,
            '7': `7`,
            '8': `8`,
            '9': `9`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.hosgeldinKanal)); // HOŞGELDİNİZ KANAL İD
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = `Ve senin hesabın sunucumuza kayıt olmak için daha çok genç! :x: `
  if (kurulus > 1296000000) kontrol = `Ve senin hesabın sunucumuza kayıt olmak için tüm şartları karşılıyor! :ballot_box_with_check: `
    moment.locale("tr");
  
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
  
    kanal.send(`
Sunucumuza hoş geldin, <@`+ member + `>! Sayende sunucumuz **`+üyesayısı+`** kişi. 
    
Sunucumuza kayıt olmak için soldaki ses kanallarından birine girmelisin!

Ayrıca hesabın 15 günden fazla bir süredir Discord'da bulunmalı.

`+kontrol+`
    
Ceza işlemlerin <#KURALLAR KANALI ID> kanalını okuduğun varsayılarak uygulanır. ( <@&HOS GELDİN MESAJ YETKİLİ ROL ID> )`)});


client.login("ODc5MzA5NDk4MDg5NjE5NDg3.YSN2yQ.ZvyluVkXfBmNAOlxfNBCw_8Cm30")

client.on("ready", () => {
  client.channels.cache.get(ayarlar.botSesKanal).join();
  });
