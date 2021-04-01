const axios = require('axios');
const API_URL = 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/';
// ?key=&format=json&steamids=76561198036370701


const valid_steamid = (steam_id) => {
    return /^STEAM_[0-5]:[01]:\d+$/.test(steam_id);
};

const steamid_64converter = (steam_id) => {
    if(valid_steamid(steam_id)){
        const magic_number = BigInt(76561197960265728);

        let numbers_only = steam_id.substr(steam_id.indexOf('_') +1);
        let numbers = numbers_only.split(':');
        let x = numbers[0],
            y = numbers[1],
            z = numbers[2];

        return magic_number + BigInt(z*2) + BigInt(y);
    }
    else
        throw new Error("Not valid steam id");
};

const grap_profile = async (steam_id) => {
    const steam64 = steamid_64converter(steam_id).toString();

    if(steam64){
        let result = null;
        let get_url = `${API_URL}?key=${process.env.STEAM_API}&format=json&steamids=${steam64}`;
        await axios.get(get_url)
            .then(res => {
                result = res.data;
            })
            .catch(err => {
                throw new Error(err);
            });
        return result;
    }
    else{
        throw new Error("Failed to get steam profile");
    }
}

module.exports = {
    valid_steamid,
    steamid_64converter,
    grap_profile
};
