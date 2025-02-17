class File {
	name: string;
	fileType: string;
	location: string;
	content?: string[];

	constructor(name: string, fileType: string, location: string) {
		this.name = name;
		this.fileType = fileType;
		this.location = location;
	}

	setContent(content: string[]) {
		this.content = content;
	}
}

const vault = new File("mari", "txt", "");
vault.setContent([
	"HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME HELP ME "
])

export const files : File[] = [
	vault,
	new File("adv", "exe", "")
];
