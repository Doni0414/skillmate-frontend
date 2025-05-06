import { getSkillsByUserId, searchUsers } from "../../api";

export async function fetchUsersAndSkills(searchValue, page, pageSize, setUsers) {
    const response = await searchUsers(searchValue, page, pageSize);
    const users = response.data.content;
    const skills = await Promise.all(users.map(user => getSkillsByUserId(user.id).then(res => res.data)));

    setUsers(response.data.content.map((user, index) => ({
        ...user,
        skills: skills[index]
    })));
    console.log(skills);
}