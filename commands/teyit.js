const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`${client.emojis.cache.get(ayarlar.yes)} ${etiketlenenKişi} kullanıcısının
${db.fetch(`kadinTeyit.${etiketlenenKişi.id}`) || 0} kadın,
${db.fetch(`erkekTeyit.${etiketlenenKişi.id}`) || 0} erkek,
${db.fetch(`toplamTeyit.${etiketlenenKişi.id}`) || 0} toplam
kaydı var.
`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))//Youtube Matthe
.setTimestamp()

message.react(client.emojis.cache.get(ayarlar.yes))

message.channel.send(arwEmbed)

}
exports.config = {
    name: "teyit",
    guildOnly: true,
    aliases: ["teyit-bilgi", "teyitbilgi", "teyitler", "teyit-sayi", "teyitsayi", "teyitsayisi", "teyit-sayisi", "kayit-bilgi", "kayitbilgi", "kayitlar", "kayit-sayi", "kayitsayi", "kayit-sayisi", "kayitsayisi"]
  }