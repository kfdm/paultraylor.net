import datetime
import pathlib
import subprocess

today = datetime.datetime.today()
path = (
    pathlib.Path(".")
    / "content"
    / "week"
    / today.strftime("%Y")
    / f'W{today.strftime("%W")}.md'
)

if path.exists():
    print("exists")
else:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w+") as fp:
        fp.write("---\n")
        fp.write("title: ")
        fp.write(today.strftime("%Y"))
        fp.write(" Week ")
        fp.write(today.strftime("%W"))
        fp.write("\ndate: ")
        fp.write(today.strftime("%Y-%m-%d"))
        fp.write("\nslug: ")
        fp.write(today.strftime("%W"))
        fp.write("\n---\n")


subprocess.check_output(["code", path])
