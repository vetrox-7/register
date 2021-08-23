const Discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {

    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author

const arwEmbed = new Discord.MessageEmbed()
.setColor("2f3136")
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

let isimler = db.get(`isimler.${etiketlenenKişi.id}`) || [];
isimler = isimler.reverse()
let isimler2 = isimler.length > 0 ? isimler.map((value) => `${ayarlar.tag} ${value.İsim} ${ayarlar.sembol} ${value.Yaş}  ( <@!${value.Yetkili}> )`).join("\n") : `${client.emojis.cache.get(ayarlar.no)} ${etiketlenenKişi} kullanıcısına ait isim bulunamadı!`

message.react(client.emojis.cache.get(ayarlar.yes))

message.channel.send(arwEmbed.setDescription(`
${client.emojis.cache.get(ayarlar.yes)} ${etiketlenenKişi} kullanıcısına ait isimler:

${isimler2}
`))

}
exports.config = {
    name: "isimler",
    guildOnly: true,
    aliases: ["names", "nicknames"]
}