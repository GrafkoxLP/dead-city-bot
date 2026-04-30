const { ownerRoleId } = require('../config');

function isOwner(member) {
    return member?.roles?.cache?.has(ownerRoleId) ?? false;
}

module.exports = { isOwner };
